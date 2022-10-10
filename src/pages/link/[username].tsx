import {} from "react";

import type { GetServerSideProps, NextPageWithLayout } from "next";

import { Head } from "~/components/core";
import {} from "~/components/layouts";

type Props = {
  link: {
    username: string;
  };
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      link: {
        username: "some-username",
      },
    },
  };
};

const LinkByUsernamePage: NextPageWithLayout<Props> = (props) => {
  const { link } = props;

  return (
    <>
      <Head title={{ prefix: `Link ${link.username}` }} />

      <div>LinkByUsernamePage</div>
    </>
  );
};

export default LinkByUsernamePage;
