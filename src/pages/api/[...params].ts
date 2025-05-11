import type { NextApiRequest, NextApiResponse } from "next";

import { allUtilities } from "@/core/utilities";
import { UtilityItem, ApiResponse } from "@/interfaces";
import { ratelimit } from "@/lib/ratelimiter";

async function getStyleData(category: string, subCategory?: string): Promise<ApiResponse[] | null> {
  const item: UtilityItem | undefined = allUtilities[category];

  if (!item) {
    return null;
  }

  const apiData: ApiResponse[] = [];
  for (const valueKey in item.values) {
    if (subCategory && valueKey !== subCategory) {
      continue;
    }

    const value = item.values[valueKey];
    const util = `${item.prefix}-${valueKey}`;
    const props = item.properties.map((property) => `${property}: ${value};`);

    apiData.push({
      slug: item.slug,
      utility: util,
      property: props,
    });
  }

  return apiData;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse[] | { error: string }>) {
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || "127.0.0.1";

  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return res.status(429).json({ error: "Rate limit exceeded" });
  }

  const { params } = req.query;

  if (!params || params.length === 0) {
    return res.status(400).json({ error: "Category is required" });
  }

  const category = params[0] as string;
  const subCategory = params[1] as string | undefined;

  try {
    const apiData = await getStyleData(category, subCategory);

    if (!apiData) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json(apiData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate API data" });
  }
}
