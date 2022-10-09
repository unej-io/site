import { host } from "~/libs/unej-io/const";

const route = (...args: string[]) => args.join("/");

route.host = {
  site(...args: string[]) {
    return `${host.site}/${args.join("/")}`;
  },
  app(...args: string[]) {
    return `${host.app}/${args.join("/")}`;
  },
};

export default route;
