import {} from "react";

import type { NextPageWithLayout } from "next";

import { Button } from "@mantine/core";

import { Head } from "~/components/core";
import { getMinimalPageLayout } from "~/components/layouts";

import { useGuestOnly } from "~/hooks/core";

const SignUpPage: NextPageWithLayout = () => {
  const [{ signUp }] = useGuestOnly({ redirect: "/", replace: true });

  function handleSignUp() {
    signUp({ username: "flamrdevs", password: "flamrdevs" });
  }

  return (
    <>
      <Head title={{ prefix: "Sign Up" }} />

      <div>SignUpPage</div>

      <Button onClick={handleSignUp}>Sign Up</Button>
    </>
  );
};

SignUpPage.getLayout = getMinimalPageLayout;

export default SignUpPage;
