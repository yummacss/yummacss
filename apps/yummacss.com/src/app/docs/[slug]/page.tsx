import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/json-ld";
import Pagination from "@/components/ui/pagination";
import ViewMarkdown from "@/components/ui/view-markdown";
import { docs } from "@/utils/docs";
import { getDocsNavigation } from "@/utils/pagination";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = docs.find((d) => d._meta.path === slug);
  const url = `https://yummacss.com/docs/${slug}`;

  return {
    title: doc?.title || "Yumma CSS Documentation",
    description: doc?.description || "",
    alternates: { canonical: url },
    openGraph: {
      title: doc?.title,
      description: doc?.description,
      url,
      images: [
        {
          url: `/docs/${slug}/og.png`,
          width: 1200,
          height: 630,
          alt: doc?.title || "Yumma CSS Documentation",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: doc?.title,
      description: doc?.description,
      images: [`/docs/${slug}/og.png`],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = docs.find((d) => d._meta.path === slug);
  if (!doc) notFound();
  const MDXContent = doc.mdx;
  const navigation = getDocsNavigation(slug);

  return (
    <div className="mb:16">
      {doc && (
        <div className="my:8" data-meta>
          <div className="d:f ai:c jc:sb mb:2">
            <h1 className="ff:display min-w:0 c:ink fs:4xl fw:400 ow:bw">
              {doc.title}
            </h1>
            <Pagination
              previous={navigation.previous}
              next={navigation.next}
              basePath="/docs"
            />
          </div>
          {doc.description && (
            <p className="c:ink/70 fs:lg">{doc.description}</p>
          )}
          <ViewMarkdown />
        </div>
      )}
      <MDXContent />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: doc?.title,
          description: doc?.description,
          url: `https://yummacss.com/docs/${slug}`,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://yummacss.com",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Documentation",
              item: "https://yummacss.com/docs",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: doc?.title || slug,
              item: `https://yummacss.com/docs/${slug}`,
            },
          ],
        }}
      />
    </div>
  );
}

export function generateStaticParams() {
  return docs.map((doc) => ({ slug: doc._meta.path }));
}

export const dynamicParams = false;
