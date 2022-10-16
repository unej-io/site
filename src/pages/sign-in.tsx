import type { NextPageWithLayout } from "next";

import { Anchor, Button, Container, Group, Paper, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { FormErrors } from "@mantine/form";
import { showNotification } from "@mantine/notifications";

import { AnchorLink } from "@unej-io/ui/next";

import { signIn } from "~/libs/unej-io/firebase/auth";
import { getFirebaseErrorMessage } from "~/libs/unej-io/firebase/utilities";

import route from "~/const/route";

import { Head } from "~/components/core";
import { getMinimalPageLayout } from "~/components/layouts";

import { useGuestOnly, useSubmitHandler } from "~/hooks/core";

type SignInFormValues = {
  email: string;
  password: string;
};

const SignInPage: NextPageWithLayout = () => {
  const [{ user }] = useGuestOnly({ redirect: "/", replace: true });

  const form = useForm<SignInFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const [submitHandler, { submitting }] = useSubmitHandler<SignInFormValues>(async (values) => {
    try {
      const { email, password } = values;
      await signIn(email, password);
    } catch (error) {
      const { code, message } = getFirebaseErrorMessage(error);
      showNotification({ id: code, title: code === "unknown" ? "Oh no!" : "Error!", message, color: "red" });
    }
  });

  const validationFailureHandler = async (errors: FormErrors) => {
    console.error(errors);
  };

  const handleSubmit = form.onSubmit(submitHandler, validationFailureHandler);

  return (
    <>
      <Head title={{ prefix: "Sign In" }} />

      <Container size="xs" my="xl" p="xl">
        <Title align="center">Welcome back!</Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{" "}
          <AnchorLink href="/sign-up" size="sm">
            Sign up
          </AnchorLink>
        </Text>

        <form onSubmit={handleSubmit}>
          <Paper withBorder shadow="md" p={30} mt={30}>
            <TextInput type="email" label="Email" placeholder="Your email" required withAsterisk {...form.getInputProps("email")} />

            <PasswordInput mt="md" label="Password" placeholder="Your password" required withAsterisk {...form.getInputProps("password")} />

            <Group position="right" mt="md">
              <Anchor href={route.host.app("forgot-password")} target="_blank" size="sm">
                Forgot password?
              </Anchor>
            </Group>

            <Button type="submit" mt="xl" fullWidth loading={submitting || Boolean(user)}>
              Sign in
            </Button>
          </Paper>
        </form>
      </Container>
    </>
  );
};

SignInPage.getLayout = getMinimalPageLayout;

export default SignInPage;
