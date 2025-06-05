import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getClientIp } from "@/utils/ip";
import { NextApiRequest, NextApiResponse } from "next";

export const redis = Redis.fromEnv();

export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "10 s"), // 10 requests every 10 seconds
  analytics: true,
  timeout: 10000,
});

export async function applyRateLimit(req: NextApiRequest, res: NextApiResponse): Promise<boolean> {
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
