import { Route } from "next-yesterday";

import { SomeService } from "~/api/services";

const route = new Route();

route.get(async (_req, res) => {
  res.json(await SomeService.hello());
});

export default route.handler();
