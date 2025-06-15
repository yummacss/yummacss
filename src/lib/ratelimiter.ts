import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getClientIp } from "@/utils/ip";
import type { NextApiRequest, NextApiResponse } from "next";

export const redis = Redis.fromEnv();
const cache = new Map();

export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, "10 s"),
  analytics: true,
  timeout: 3000,
  ephemeralCache: cache,
});

export async function applyRateLimit(req: NextApiRequest, res: NextApiResponse): Promise<boolean> {
  if (req.headers.origin === "https://yummacss.com") {
    return false;
  }

  const identifier = getClientIp(req);
  const result = await ratelimit.limit(identifier);

  res.setHeader("X-RateLimit-Limit", result.limit);
  res.setHeader("X-RateLimit-Remaining", result.remaining);
  res.setHeader("X-RateLimit-Reset", result.reset);

  if (!result.success) {
    res.status(429).json({
      error: "Too many requests. Please try again later.",
    });
    return true;
  }

  return false;
}
