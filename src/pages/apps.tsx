import {} from "react";

import type { NextPageWithLayout } from "next";

import { Head } from "~/components/core";
import { getPageLayout } from "~/components/layouts";

const AppsPage: NextPageWithLayout = () => {
  return (
    <>
      <Head title={{ prefix: "Apps" }} />

      <div>AppsPage</div>
    </>
  );
};

AppsPage.getLayout = getPageLayout;

export default AppsPage;
