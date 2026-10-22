import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const match = request.nextUrl.pathname.match(/^\/docs\/([^/]+)\.md$/);
  if (match) {
    return NextResponse.rewrite(
      new URL(`/api/docs-md/${match[1]}`, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/docs/:path*.md"],
};
