import { useEffect, useMemo } from "react";
import type { PropsWithChildren } from "react";

import useAuthStore, { createAuthStore, AuthStoreProvider } from "~/stores/auth";

type AuthProviderChildProps = PropsWithChildren<{}>;

function AuthProviderChild(props: AuthProviderChildProps) {
  const {} = useAuthStore();

  useEffect(() => {
    // firebase subscribe
  }, []);

  return <>{props.children}</>;
}

type AuthProviderProps = PropsWithChildren<{}>;

function AuthProvider(props: AuthProviderProps) {
  const createStore = useMemo(() => createAuthStore(), []);

  return (
    <AuthStoreProvider createStore={createStore}>
      <AuthProviderChild>{props.children}</AuthProviderChild>
    </AuthStoreProvider>
  );
}

export type { AuthProviderProps };
export default AuthProvider;
