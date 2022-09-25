import {} from "react";

import type { NextPageWithLayout } from "next";

import { Head } from "~/components/core";
import { getPageLayout } from "~/components/layouts";

const ContributePage: NextPageWithLayout = () => {
  return (
    <>
      <Head title={{ prefix: "Contribute" }} />

      <div>ContributePage</div>
    </>
  );
};

ContributePage.getLayout = getPageLayout;

export default ContributePage;
