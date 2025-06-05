import { NextApiRequest } from "next";

export function getClientIp(req: NextApiRequest): string {
  const ip =
    (req.headers["x-real-ip"] as string) ||
    (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
    req.socket.remoteAddress;

  return ip || "127.0.0.1";
}
