import type { NextApiRequest, NextApiResponse } from "next";

import lib from "cors";

import { APIError } from "../core";

async function libAsync(
  req: lib.CorsRequest,
  res: {
    statusCode?: number | undefined;
    setHeader(key: string, value: string): any;
    end(): any;
  },
  options?: lib.CorsOptions | lib.CorsOptionsDelegate<lib.CorsRequest>
) {
  return new Promise<unknown>((resolve, reject) => {
    lib(options)(req, res, (result: Error | unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

async function cors<T>(req: NextApiRequest, res: NextApiResponse<T>, options?: lib.CorsOptions | lib.CorsOptionsDelegate<lib.CorsRequest>) {
  try {
    await libAsync(req, res, options);
  } catch (error) {
    throw new APIError({ status: 401, message: "CORS" });
  }
}

export default cors;
