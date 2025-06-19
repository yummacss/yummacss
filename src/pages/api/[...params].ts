import type { NextApiRequest, NextApiResponse } from "next";
import { allUtilities } from "@/core/utilities";
import { UtilityItem, ApiResponse } from "@/interfaces";
import { handleCors } from "@/utils/cors";
import { applyRateLimit } from "@/lib/limiter";

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
  if (handleCors(req, res)) return;

  if (await applyRateLimit(req, res)) return;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
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
