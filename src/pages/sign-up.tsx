import type { NextPageWithLayout } from "next";

import { Button, Container, Paper, PasswordInput, Text, TextInput, Title } from "@mantine/core";

import { useForm } from "@mantine/form";
import type { FormErrors } from "@mantine/form";
import { showNotification } from "@mantine/notifications";

import { signUp } from "~/libs/unej-io/firebase/auth";
import { getFirebaseErrorMessage } from "~/libs/unej-io/firebase/utilities";

import { AnchorLink, Head } from "~/components/core";
import { getMinimalPageLayout } from "~/components/layouts";

import { useGuestOnly, useSubmitHandler } from "~/hooks/core";

type SignUpFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpPage: NextPageWithLayout = () => {
  const [{ user }] = useGuestOnly({ redirect: "/", replace: true });

  const form = useForm<SignUpFormValues>({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [submitHandler, { submitting }] = useSubmitHandler<SignUpFormValues>(async (values) => {
    try {
      const { email, password, confirmPassword } = values;
      if (password !== confirmPassword) throw new Error("Password don't match");
      await signUp(email, password);
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
      <Head title={{ prefix: "Sign Up" }} />

      <Container size="xs" my="xl" p="xl">
        <Title align="center">Welcome back!</Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Already have an account?{" "}
          <AnchorLink href="/sign-in" size="sm">
            Sign in
          </AnchorLink>
        </Text>

        <form onSubmit={handleSubmit}>
          <Paper withBorder shadow="md" p={30} mt={30}>
            <TextInput type="email" label="Email" placeholder="Your email" required {...form.getInputProps("email")} />

            <PasswordInput mt="md" label="Password" placeholder="Your password" required {...form.getInputProps("password")} />

            <PasswordInput
              mt="md"
              label="Confirm Password"
              placeholder="Confirmation password"
              required
              {...form.getInputProps("confirmPassword")}
            />

            <Button type="submit" mt="xl" fullWidth loading={submitting || Boolean(user)}>
              Sign up
            </Button>
          </Paper>
        </form>
      </Container>
    </>
  );
};

SignUpPage.getLayout = getMinimalPageLayout;

export default SignUpPage;
