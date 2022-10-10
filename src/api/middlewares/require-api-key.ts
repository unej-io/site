import type { NextApiRequest, NextApiResponse } from "next";

import { APIError } from "../core";
import { APIService } from "../services";

async function requireAPIKey<T>(req: NextApiRequest, _res: NextApiResponse<T>) {
  const { apiKey } = req.query as Partial<{ apiKey: string }>;

  if (typeof apiKey !== "string") {
    throw new APIError({ status: 400, message: "Missing API key" });
  }

  try {
    await APIService.verifyAPIKey(apiKey);
  } catch (error) {
    throw new APIError({ status: 401, message: "Invalid API key" });
  }
}

export default requireAPIKey;
