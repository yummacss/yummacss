import { allUis } from "content-collections";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/json-ld";
import Pagination from "@/components/ui/pagination";
import ViewMarkdown from "@/components/ui/view-markdown";
import { pagePath, UI_ORIGIN } from "@/utils/hosts";
import { getNavigation } from "@/utils/pagination";
import { pageParams } from "./params";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ui = allUis.find((u) => u._meta.path === slug);
  const url = `${UI_ORIGIN}${pagePath(slug)}`;

  return {
    title: ui?.title || "Yumma UI",
    description: ui?.description || "",
    alternates: { canonical: url },
    openGraph: {
      title: ui?.title,
      description: ui?.description,
      url,
      images: [
        {
          url: `${pagePath(slug)}/og.png`,
          width: 1200,
          height: 630,
          alt: ui?.title || "Yumma UI",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ui?.title,
      description: ui?.description,
      images: [`${pagePath(slug)}/og.png`],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ui = allUis.find((u) => u._meta.path === slug);
  if (!ui) notFound();
  const MDXContent = ui.mdx;
  const navigation = getNavigation(slug);

  const stage = Boolean(ui.playground);

  return (
    <div className={stage ? "d:f fd:c fs:0" : "d:f fd:c f:1 min-h:0 mb:16"}>
      {ui && (
        <div className={`my:8 ${stage ? "fs:0" : ""}`} data-meta>
          <div className="d:f ai:c jc:sb mb:2">
            <h1 className="ff:display min-w:0 c:ink fs:4xl fw:400 ow:bw">
              {ui.title}
            </h1>
            <div className="d:f fs:0 ai:c g:2">
              <Pagination
                previous={navigation.previous}
                next={navigation.next}
              />
            </div>
          </div>
          {ui.description && <p className="c:ink/70 fs:lg">{ui.description}</p>}
          <ViewMarkdown />
        </div>
      )}
      <div>
        <MDXContent />
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Yumma UI",
              item: `${UI_ORIGIN}/docs/installation`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: ui?.title || slug,
              item: `${UI_ORIGIN}${pagePath(slug)}`,
            },
          ],
        }}
      />
    </div>
  );
}

export const generateStaticParams = pageParams;

export const dynamicParams = false;
