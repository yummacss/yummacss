import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const docsMatch = pathname.match(/^\/docs\/([^/]+)\.md$/);
  if (docsMatch) {
    const slug = docsMatch[1];
    return NextResponse.rewrite(new URL(`/api/docs-md/${slug}`, request.url));
  }

  const uiMatch = pathname.match(/^\/components\/([^/]+)\.md$/);
  if (uiMatch) {
    const slug = uiMatch[1];
    return NextResponse.rewrite(new URL(`/api/ui-md/${slug}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/docs/:path*.md", "/components/:path*.md"],
};
