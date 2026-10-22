import { docs } from "@/utils/docs";
import { docsOg, ogImage } from "@/utils/og-image";

export const dynamicParams = false;

export function generateStaticParams() {
  return docs.map((doc) => ({ slug: doc._meta.path }));
}

export async function GET(
  _: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  return ogImage(docsOg((await params).slug));
}
