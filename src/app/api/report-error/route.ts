// pages/api/report-error.ts (or app/api/report-error/route.ts)
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") return res.status(405).end();
  const payload = req.body;

  // payload.ref + payload.error
  // Important: send this to Sentry or your log storage with the ref
  console.error("Client error report", payload.ref, payload.error);

  // if you use Sentry:
  // Sentry.captureException(payload.error, { tags: { ref: payload.ref } })

  return res.status(200).json({ ok: true, ref: payload.ref });
}
