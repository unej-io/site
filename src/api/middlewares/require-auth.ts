import type { NextApiRequest, NextApiResponse } from "next";

import { APIError } from "../core";
import { AuthService } from "../services";

async function requireAuth<T>(req: NextApiRequest, _res: NextApiResponse<T>) {
  const headers = req.headers;

  const [, token] = (headers.authorization ?? "").split(" ");

  if (typeof token !== "string") {
    throw new APIError({ status: 400, message: "Missing auth token" });
  }

  try {
    await AuthService.verifyAuthToken(token);

    const result = {
      uid: "some-uid",
      role: "student",
    };

    return result;
  } catch (error) {
    throw new APIError({ status: 401, message: "Invalid auth token" });
  }
}

export default requireAuth;
