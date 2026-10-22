import { allUis } from "content-collections";
import Navbar from "@/components/ui/navbar";
import UIShell from "@/components/ui/shell";
import Sidebar, { menu } from "@/components/ui/sidebar";
import SkipLink from "@/components/ui/skip-link";
import type { Primitives } from "@/utils/primitive";

const playgrounds = allUis
  .filter((ui) => ui.playground)
  .map((ui) => ui._meta.path);

const primitives: Primitives = Object.fromEntries(
  allUis.flatMap((ui) => (ui.primitive ? [[ui._meta.path, ui.primitive]] : [])),
);

export default function SectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h:dvh">
      <SkipLink />
      <Navbar menu={menu()} />

      <main
        id="main"
        className="zi:0 mx:auto px:6 max-w:clamp(40rem,80vw,96rem)"
      >
        <UIShell
          sidebar={<Sidebar />}
          playgrounds={playgrounds}
          primitives={primitives}
        >
          {children}
        </UIShell>
      </main>
    </div>
  );
}
