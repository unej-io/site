import {} from "react";

import type { NextPageWithLayout } from "next";

import { Head } from "~/components/core";
import { getPageLayout } from "~/components/layouts";

const ReleasesPage: NextPageWithLayout = () => {
  return (
    <>
      <Head title={{ prefix: "Releases" }} />

      <div>ReleasesPage</div>
    </>
  );
};

ReleasesPage.getLayout = getPageLayout;

export default ReleasesPage;
