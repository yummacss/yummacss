// Screenshots every Yumma UI component's preview into public/og/ui/<slug>.png,
// at twice its size, for the link previews. Run it against a running site:
//   pnpm og:components [http://localhost:3000] [slug ...]
// The notes, "OG images".
import { mkdir, readdir } from "node:fs/promises";
import { chromium } from "playwright";

const [BASE = "http://localhost:3000", ...ONLY] = process.argv.slice(2);
const OUT = "public/og/ui";
// the OG image's own page colour, so a component sits on it rather than on a
// white preview box; src/components/og-image.tsx, PAGE
const PAGE = "#f7f8fb";

// what a preview needs before it shows the component at its best: popups open
const first = (frame) =>
  frame.locator("#root button, #root [tabindex]").first();
const click = (frame) => first(frame).click();
const hover = async (frame) => {
  await first(frame).hover();
  await first(frame).focus();
};
const ACTIONS = {
  autocomplete: async (frame) => {
    await frame.locator("input").first().click();
    await frame.locator("input").first().pressSequentially("L", { delay: 100 });
  },
  "alert-dialog": click,
  combobox: (frame) => frame.locator("input").first().click(),
  "context-menu": (frame) =>
    frame.locator("#root *").first().click({ button: "right" }),
  dialog: click,
  drawer: click,
  menu: click,
  menubar: click,
  popover: click,
  "preview-card": (frame) => frame.locator("#root a").first().hover(),
  select: click,
  tooltip: hover,
};

// too thin, or wider than the preview, to read at link-preview size; these keep
// the title layout
const SKIP = new Set(["separator", "skeleton", "toolbar"]);

const slugs = (await readdir("src/content/ui"))
  .filter((file) => file.endsWith(".mdx"))
  .map((file) => file.replace(/\.mdx$/, ""))
  .filter((slug) => !SKIP.has(slug) && (!ONLY.length || ONLY.includes(slug)));

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
});
const page = await browser.newPage({
  viewport: { width: 1280, height: 1000 },
  deviceScaleFactor: 2,
});

for (const slug of slugs) {
  await page.goto(`${BASE}/components/${slug}`, {
    waitUntil: "networkidle",
  });
  const iframe = page.locator('iframe[title="Component preview"]').first();
  if (!(await iframe.count())) continue;
  await iframe.scrollIntoViewIfNeeded();
  const frame = await (await iframe.elementHandle()).contentFrame();
  await frame.addStyleTag({
    content: `html, body, #root { background: ${PAGE} !important; }`,
  });
  await ACTIONS[slug]?.(frame);
  await page.waitForTimeout(ACTIONS[slug] ? 1500 : 300);

  // everything the component drew, leaving out boxes that only fill the frame
  const area = await frame.evaluate(() => {
    const limit = document.documentElement.clientWidth * 0.95;
    const rects = [
      ...document.querySelectorAll("#root *, body > :not(#root) *"),
    ]
      .filter((el) => {
        const style = getComputedStyle(el);
        return (
          style.visibility !== "hidden" &&
          style.opacity !== "0" &&
          style.clip === "auto"
        );
      })
      .map((el) => el.getBoundingClientRect())
      // hidden inputs are a pixel square; backdrops fill the frame
      .filter((r) => r.width > 2 && r.height > 2 && r.width < limit);
    if (!rects.length) return null;
    const left = Math.min(...rects.map((r) => r.left));
    const top = Math.min(...rects.map((r) => r.top));
    return {
      left,
      top,
      width: Math.max(...rects.map((r) => r.right)) - left,
      height: Math.max(...rects.map((r) => r.bottom)) - top,
    };
  });
  if (!area) continue;

  const box = await iframe.boundingBox();
  const pad = 6;
  await page.screenshot({
    path: `${OUT}/${slug}.png`,
    clip: {
      x: box.x + area.left - pad,
      y: box.y + area.top - pad,
      width: area.width + pad * 2,
      height: area.height + pad * 2,
    },
  });
  console.log(
    `${slug}  ${Math.round(area.width)} × ${Math.round(area.height)}`,
  );
}

await browser.close();
