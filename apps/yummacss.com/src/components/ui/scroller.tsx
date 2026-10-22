"use client";

import { ScrollArea } from "@base-ui/react/scroll-area";
import type { ReactNode, RefObject } from "react";

export default function Scroller({
  className = "",
  viewportClassName = "",
  viewportRef,
  children,
}: {
  className?: string;
  viewportClassName?: string;
  viewportRef?: RefObject<HTMLDivElement | null>;
  children: ReactNode;
}) {
  return (
    <div className={`d:f fd:c ${className}`}>
      <ScrollArea.Root className="d:f f:1 fd:c min-h:0">
        <ScrollArea.Viewport
          ref={viewportRef}
          className={`f:1 min-h:0 ob:c fv:oc:accent fv:os:s fv:ow:2 fv:oo:-2 ${viewportClassName}`}
        >
          {children}
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          orientation="vertical"
          className="d:f w:3 zi:20 jc:c o:0 tp:o tdu:150 ttf:io hovering:o:100 scrolling:o:100 @prm:tp:none"
        >
          <ScrollArea.Thumb className="w:100% bg:ink/25 h:bg:ink/40" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  );
}
