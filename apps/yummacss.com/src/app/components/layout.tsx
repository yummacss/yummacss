import { allUis } from "content-collections";
import type { Metadata } from "next";
import Navbar from "@/components/ui/navbar";
import UIShell from "@/components/ui/shell";
import Sidebar, { menus } from "@/components/ui/sidebar";
import SkipLink from "@/components/ui/skip-link";
import { UI_ORIGIN } from "@/utils/hosts";
import type { Primitives } from "@/utils/primitive";

const description =
  "A collection of UI components styled with Yumma CSS and Base UI.";

export const metadata: Metadata = {
  title: {
    default: `Yumma UI - ${description}`,
    template: "%s · Yumma UI",
  },
  description,
  metadataBase: new URL(UI_ORIGIN),
  openGraph: {
    images: "/ui-og.png",
  },
};

const playgrounds = allUis
  .filter((ui) => ui.playground)
  .map((ui) => ui._meta.path);

const primitives: Primitives = Object.fromEntries(
  allUis.flatMap((ui) => (ui.primitive ? [[ui._meta.path, ui.primitive]] : [])),
);

export default function UILayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h:dvh">
      <SkipLink />
      <Navbar menu={menus()} />

      <main
        id="main"
        className="zi:0 mx:auto px:6 max-w:clamp(40rem,80vw,96rem)"
      >
        <UIShell
          sidebar={<Sidebar variant="ui" />}
          playgrounds={playgrounds}
          primitives={primitives}
        >
          {children}
        </UIShell>
      </main>
    </div>
  );
}
