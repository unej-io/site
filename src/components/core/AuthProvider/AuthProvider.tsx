import { useEffect, useMemo, useState } from "react";
import type { PropsWithChildren } from "react";

import { useRouter } from "next/router";

import { Anchor, Center } from "@mantine/core";
import { showNotification, hideNotification } from "@mantine/notifications";

import auth from "~/libs/unej-io/firebase/auth";

import route from "~/const/route";

import useAuthStore, { createAuthStore, AuthStoreProvider } from "~/stores/auth";

import { LogoLoader } from "~/components/core";

function CenterLogoLoader() {
  return (
    <Center sx={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <LogoLoader />
    </Center>
  );
}

type AuthProviderChildProps = PropsWithChildren<{}>;

function AuthProviderChild(props: AuthProviderChildProps) {
  const router = useRouter();

  const { user, loading, setUser, setLoading } = useAuthStore();

  const [notifyEmailVerified, setNotifyEmailVerified] = useState(false);

  useEffect(
    () =>
      auth.onAuthStateChanged((user) => {
        if (user) setUser(user);
        else setUser(null);

        setLoading(false);
      }),
    []
  );

  useEffect(
    () =>
      auth.onIdTokenChanged((user) => {
        if (user) setUser(user);
        else setUser(null);

        setLoading(false);
      }),
    []
  );

  useEffect(() => {
    if (!router.asPath.startsWith("/auth") && user && !user.emailVerified && !notifyEmailVerified) {
      const id = "verify-account";

      const handleCloseNotification = () => {
        hideNotification(id);
      };

      showNotification({
        id,
        title: "Verify account",
        message: (
          <Anchor href={route.host.app("/auth/email-verification")} target="_blank" onClick={handleCloseNotification}>
            Request email verification
          </Anchor>
        ),
        color: "yellow",
      });
      setNotifyEmailVerified(true);
    }
  }, [router.asPath, user, notifyEmailVerified]);

  /**
   * WAIT FOR INITIAL AUTH CHECK
   */
  if (loading) return <CenterLogoLoader />;

  /**
   * RENDER ROUTES
   */
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
