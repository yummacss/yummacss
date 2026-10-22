import { allUis } from "content-collections";
import { ogImage, uiOg } from "@/utils/og-image";

export const dynamicParams = false;

export function generateStaticParams() {
  return allUis
    .filter((ui) => ui._meta.path !== "components")
    .map((ui) => ({ slug: ui._meta.path }));
}

export async function GET(
  _: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  return ogImage(await uiOg((await params).slug));
}
