import {} from "react";

import type { NextPageWithLayout } from "next";

import { Head } from "~/components/core";
import { getPageLayout } from "~/components/layouts";

const LinkPage: NextPageWithLayout = () => {
  return (
    <>
      <Head title={{ prefix: "Link" }} />

      <div>LinkPage</div>
    </>
  );
};

LinkPage.getLayout = getPageLayout;

export default LinkPage;
