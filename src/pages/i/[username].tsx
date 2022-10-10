import {} from "react";

import type { GetServerSideProps, NextPageWithLayout } from "next";

import { Head } from "~/components/core";
import {} from "~/components/layouts";
import { UserService } from "~/api/services";

type Props = {
  user: {
    displayName?: string;
    username: string;
  };
};

type Query = {
  username: string;
};

export const getServerSideProps: GetServerSideProps<Props, Query> = async (ctx) => {
  const { username } = ctx.params ?? {};

  if (typeof username !== "string") {
    return {
      props: {} as Props,
      notFound: true,
    };
  }

  try {
    const user = await UserService.findByUsername(username);

    if (!user) {
      return {
        props: {} as Props,
        notFound: true,
      };
    }

    return {
      props: {
        user: {
          displayName: "Muhammad Faisal Amruddin",
          username: user.username,
        },
      },
    };
  } catch (error) {
    return {
      props: {} as Props,
      notFound: true,
    };
  }
};

const UserByUsernamePage: NextPageWithLayout<Props> = (props) => {
  const { user } = props;

  return (
    <>
      <Head title={{ prefix: `I'am ${user.displayName ?? user.username}` }} />

      <div>UserByUsernamePage</div>
    </>
  );
};

export default UserByUsernamePage;
