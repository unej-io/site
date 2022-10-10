import { Route } from "next-yesterday";

import type { ResponseData, ResponseMessage } from "~/api/types";
import { APIError } from "~/api/core";
import { cors, requireAuth } from "~/api/middlewares";
import { APIService } from "~/api/services";
import { response } from "~/api/utilities";

const route = new Route();

/**
 * POST /api/api-key/create
 */
route.post<
  {},
  {
    Body: ResponseData<200, string> | ResponseMessage<number & {}>;
  }
>(async (req, res) => {
  try {
    await cors(req, res);
    await requireAuth(req, res);
  } catch (error) {
    if (error instanceof APIError) return response.$fromAPIError(res, error);
  }

  return response.ok(res, {
    status: 200,
    data: await APIService.createAPIKey(),
  });
});

export default route.handler();
