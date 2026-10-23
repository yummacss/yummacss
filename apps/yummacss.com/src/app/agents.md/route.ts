import { agentRules } from "@/utils/agent-rules";

export const dynamic = "force-static";

export function GET() {
  return new Response(agentRules(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
