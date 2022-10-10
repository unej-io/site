import type { NextApiResponse } from "next";

import { APIError } from "./core";
import type { ResponseMessage } from "./types";

const response = {
  ok<T>(res: NextApiResponse<T>, body: T) {
    res.status(200);
    res.json(body);
  },
  badRequest<T>(res: NextApiResponse<T>, body: T) {
    res.status(400);
    res.json(body);
  },
  unauthorized<T>(res: NextApiResponse<T>, body: T) {
    res.status(401);
    res.json(body);
  },
  notFound<T>(res: NextApiResponse<T>, body: T) {
    res.status(404);
    res.json(body);
  },
  internalServerError<T>(res: NextApiResponse<T>, body: T) {
    res.status(500);
    res.json(body);
  },
  $fromAPIError(res: NextApiResponse<ResponseMessage<number>>, error: APIError) {
    const { status, message } = error;
    res.status(status);
    res.json({ status, message });
    return;
  },
};

export { response };
