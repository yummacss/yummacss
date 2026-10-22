import { HOME_OG, ogImage } from "@/utils/og-image";

export const dynamic = "force-static";

export function GET() {
  return ogImage(HOME_OG.css);
}
