import {} from "react";

import type { GetServerSideProps, NextPageWithLayout } from "next";

import { Head } from "~/components/core";
import {} from "~/components/layouts";
import { LinkRenderer } from "~/components/features/link";

import { queryByUsername } from "~/libs/unej-io/firebase-admin/firestore/UserCollection";

type Props = {
  username: string;
  link: {
    links: {
      title: string;
    }[];
  };
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const { username } = params || {};

  if (typeof username !== "string") {
    return { notFound: true };
  }

  const snapshot = await queryByUsername(username);

  if (snapshot.empty) {
    return { notFound: true };
  }

  const [doc] = snapshot.docs;

  const user = doc.data();

  return {
    props: {
      username: user.username,
      link: {
        links: [{ title: "A" }, { title: "B" }, { title: "C" }],
      },
    },
  };
};

const LinkByUsernamePage: NextPageWithLayout<Props> = (props) => {
  const { username } = props;

  return (
    <>
      <Head title={{ prefix: `Link ${username}` }} />

      <div>LinkByUsernamePage</div>

      <LinkRenderer />
    </>
  );
};

export default LinkByUsernamePage;
