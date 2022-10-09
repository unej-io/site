import { devtools } from "zustand/middleware";

const withDevtools = (process.env.NODE_ENV === "production" ? (fn: any) => fn : devtools) as unknown as typeof devtools;

export { withDevtools };
