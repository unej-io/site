import { Route } from "next-yesterday";

import dayjs from "dayjs";
import dayjsCustomParseFormat from "dayjs/plugin/customParseFormat";

import { APIError } from "~/api/core";
import { cors, requireAPIKey, requireAuth } from "~/api/middlewares";
import { EventService } from "~/api/services";
import { response } from "~/api/utilities";

dayjs.extend(dayjsCustomParseFormat);

const route = new Route();

/**
 * POST /api/events/create
 */
route.post<
  {
    Body: {
      title: string;
      description: string;
      link: string;
      date: string;
    };
  },
  {
    Body:
      | {
          status: 200;
          data: {
            title: string;
            description: string;
            link: string;
            date: Date;
          };
        }
      | {
          status: 400 | 401 | (number & {});
          message: string;
        };
  }
>(async (req, res) => {
  try {
    await cors(req, res);
    await requireAuth(req, res);
    await requireAPIKey(req, res);
  } catch (error) {
    if (error instanceof APIError) return response.$fromAPIError(res, error);
  }

  const { title, description, link, date } = req.body;

  if (typeof title !== "string") {
    return response.badRequest(res, {
      status: 400,
      message: "Require title field",
    });
  }

  if (typeof description !== "string") {
    return response.badRequest(res, {
      status: 400,
      message: "Require description field",
    });
  }

  if (typeof link !== "string") {
    return response.badRequest(res, {
      status: 400,
      message: "Require link field",
    });
  }

  if (typeof date !== "string") {
    return response.badRequest(res, {
      status: 400,
      message: "Require date field",
    });
  }

  try {
    const _date = dayjs(date, "DD-MM-YYYY");

    if (!_date.isValid()) {
      throw new APIError({ status: 400, message: "Invalid date format" });
    }

    const event = await EventService.create({ title, description, link, date: _date.toDate() });

    return response.ok(res, {
      status: 200,
      data: event,
    });
  } catch (error) {
    if (error instanceof APIError) return response.$fromAPIError(res, error);

    return response.internalServerError(res, { status: 500, message: "Something went wrong" });
  }
});

export default route.handler();
