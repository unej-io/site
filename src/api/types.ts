type ResponseData<S extends number, D extends any> = {
  status: S;
  data: D;
};

type ResponseMessage<S extends number, M extends string = string> = {
  status: S;
  message: M;
};

export type { ResponseData, ResponseMessage };
