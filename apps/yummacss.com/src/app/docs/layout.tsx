import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";
import Sidebar, { menus } from "@/components/ui/sidebar";
import SkipLink from "@/components/ui/skip-link";
import TableOfContents from "@/components/ui/toc";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h:dvh c:ink">
      <SkipLink />
      <Navbar menu={menus()} />

      <main
        id="main"
        className="is:i mx:auto px:6 max-w:clamp(40rem,80vw,96rem)"
      >
        <div className="d:g gtc:1 g:8 @lg:gtc:12">
          <Sidebar variant="docs" />

          <div className="pt:12 @lg:gc-s:6">
            <article>{children}</article>
          </div>

          <TableOfContents />
        </div>
      </main>

      <Footer />
    </div>
  );
}
