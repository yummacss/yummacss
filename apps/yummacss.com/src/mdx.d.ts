declare module "*.mdx" {
  import type { ComponentProps, ComponentType } from "react";

  const MDXComponent: ComponentType<ComponentProps<"div">>;
  export default MDXComponent;
  export const meta: {
    title?: string;
    description?: string;
    [key: string]: unknown;
  };
}
