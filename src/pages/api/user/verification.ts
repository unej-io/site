import { Route } from "next-yesterday";

import { APIError } from "~/api/core";
import { cors, requireAuth } from "~/api/middlewares";
import { UserService } from "~/api/services";
import { response } from "~/api/utilities";

const route = new Route();

/**
 * POST /api/user/verification
 */
route.post<{
  Query: {
    as: "student" | "organization";
  };
  Body: {
    // user
    username: string;
    // student
    password: string;
    // organization
    token: string;
  };
}>(async (req, res) => {
  try {
    await cors(req, res);
    await requireAuth(req, res);
  } catch (error) {
    if (error instanceof APIError) return response.$fromAPIError(res, error);
  }

  const { as } = req.query;

  if (as !== "student" && as !== "organization") {
    return response.badRequest(res, {
      status: 400,
      message: "'As' query don't match rules",
    });
  }

  if (as === "student") {
    const { username, password } = req.body;

    if (typeof username !== "string") {
      return response.badRequest(res, {
        status: 400,
        message: "Require username field",
      });
    }
    if (typeof password !== "string") {
      return response.badRequest(res, {
        status: 400,
        message: "Require password field",
      });
    }

    const found = await UserService.verifyAsStudent(username, password);

    if (found) {
      return response.ok(res, {
        status: 200,
        message: "Verified as student",
      });
    } else {
      return response.notFound(res, {
        status: 404,
        message: "Student not found",
      });
    }
  }

  if (as === "organization") {
    const { username, token } = req.body;

    if (typeof username !== "string") {
      return response.badRequest(res, {
        status: 400,
        message: "Require username field",
      });
    }
    if (typeof token !== "string") {
      return response.badRequest(res, {
        status: 400,
        message: "Require token field",
      });
    }

    const found = await UserService.verifyAsOrganization(username, token);

    if (found) {
      return response.ok(res, {
        status: 200,
        message: "Verified as organization",
      });
    } else {
      return response.notFound(res, {
        status: 404,
        message: "Organization not found",
      });
    }
  }
});

export default route.handler();
