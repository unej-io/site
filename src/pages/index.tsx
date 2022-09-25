import {} from "react";

import type { NextPageWithLayout } from "next";

import { Head } from "~/components/core";
import { getPageLayout } from "~/components/layouts";

const IndexPage: NextPageWithLayout = () => {
  return (
    <>
      <Head />

      <div>IndexPage</div>
    </>
  );
};

IndexPage.getLayout = getPageLayout;

export default IndexPage;
