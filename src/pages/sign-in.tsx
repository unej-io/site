import {} from "react";

import type { NextPageWithLayout } from "next";

import { Button } from "@mantine/core";

import { Head } from "~/components/core";
import { getMinimalPageLayout } from "~/components/layouts";

import { useGuestOnly } from "~/hooks/core";

const SignInPage: NextPageWithLayout = () => {
  const [{ signIn }] = useGuestOnly({ redirect: "/", replace: true });

  function handleSignIn() {
    signIn({ username: "flamrdevs", password: "flamrdevs" });
  }

  return (
    <>
      <Head title={{ prefix: "Sign In" }} />

      <div>SignInPage</div>

      <Button onClick={handleSignIn}>Sign In</Button>
    </>
  );
};

SignInPage.getLayout = getMinimalPageLayout;

export default SignInPage;
