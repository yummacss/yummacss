import { ogImage, uiOg } from "@/utils/og-image";
import { pageParams } from "../params";

export const dynamicParams = false;

export const generateStaticParams = pageParams;

export async function GET(
  _: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  return ogImage(await uiOg((await params).slug));
}
