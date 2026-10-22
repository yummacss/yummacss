import path from "node:path";
import { withContentCollections } from "@content-collections/next";
import createMDX from "@next/mdx";
import { redirects } from "./redirects";

const nextConfig = {
  allowedDevOrigins: ["192.168.1.68"],
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "mjs", "ts", "tsx"],
  experimental: {
    cpus: 2,
  },
  async redirects() {
    return redirects;
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      "remark-frontmatter",
      "remark-gfm",
      "remark-directive",
      path.resolve("src/plugins/remark-admonition.mjs"),
    ],
    rehypePlugins: [
      [path.resolve("src/plugins/rehype-registry.mjs"), {}],
      path.resolve("src/plugins/rehype-code.mjs"),
    ],
  },
});

export default withContentCollections(withMDX(nextConfig));
