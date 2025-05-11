import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(2, "5 s"), // 2 requests every 5 seconds
  analytics: true,
  timeout: 10000, // 10 seconds
});
