"use client";

import { Button } from "@base-ui/react/button";
import Link from "next/link";
import { NavArrowLeft, NavArrowRight } from "@/icons";
import { pagePath } from "@/utils/hosts";

interface Props {
  previous: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
}

export default function Pagination({ previous, next }: Props) {
  if (!previous && !next) {
    return null;
  }

  return (
    <div className="d:f fs:0 ai:c g:2">
      {previous && (
        <Button
          nativeButton={false}
          render={<Link href={pagePath(previous.slug)} />}
          aria-label={`Previous: ${previous.title}`}
          className="d:f ai:c jc:c w:8 h:8 bc:border bg:surface h:bg:hover a:bg:press c:ink bw:1 fv:oc:ink fv:oo:2"
        >
          <NavArrowLeft className="w:4 h:4" />
        </Button>
      )}

      {next && (
        <Button
          nativeButton={false}
          render={<Link href={pagePath(next.slug)} />}
          aria-label={`Next: ${next.title}`}
          className="d:f ai:c jc:c w:8 h:8 bc:border bg:surface h:bg:hover a:bg:press c:ink bw:1 fv:oc:ink fv:oo:2"
        >
          <NavArrowRight className="w:4 h:4" />
        </Button>
      )}
    </div>
  );
}
