import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getClientIp } from "@/utils/ip";
import { NextApiRequest, NextApiResponse } from "next";

const redis = Redis.fromEnv();
const cache = new Map();

export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, "10 s"), // 20 requests every 10 seconds
  analytics: true,
  ephemeralCache: cache,
  timeout: 3000, // 3 seconds
});

export async function applyRateLimit(req: NextApiRequest, res: NextApiResponse): Promise<boolean> {
  const identifier = getClientIp(req);
  const result = await ratelimit.limit(identifier);

  res.setHeader("X-RateLimit-Limit", result.limit);
  res.setHeader("X-RateLimit-Remaining", result.remaining);
  res.setHeader("X-RateLimit-Reset", result.reset);

  if (!result.success) {
    res.status(429).json({
      error: "You have exceeded the rate limit.",
    });
    return true;
  }

  return false;
}
