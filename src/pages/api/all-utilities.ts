import type { NextApiRequest, NextApiResponse } from "next";
import { allUtilities } from "@/core/utilities";
import { ApiResponse } from "@/interfaces";
import { handleCors } from "@/utils/cors";
import { applyRateLimit } from "@/lib/limiter";

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse[] | { error: string }>) {
  if (handleCors(req, res)) return;

  if (await applyRateLimit(req, res)) return;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const allUtils: ApiResponse[] = [];

    for (const category in allUtilities) {
      const item = allUtilities[category];

      for (const valueKey in item.values) {
        const value = item.values[valueKey];
        const util = `${item.prefix}-${valueKey}`;

        const props = item.properties.map((property) => `${property}: ${value};`);

        allUtils.push({
          slug: item.slug,
          utility: util,
          property: props,
        });
      }
    }

    return res.status(200).json(allUtils);
  } catch (error) {
    console.error("Failed to generate all utilities:", error);
    return res.status(500).json({ error: "Failed to generate API data" });
  }
}
