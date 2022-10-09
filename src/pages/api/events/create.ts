import { Route } from "next-yesterday";

import { NewsService } from "~/api/services";

const route = new Route();

route.post(async (_req, res) => {
  res.json(await NewsService.create());
});

export default route.handler();
