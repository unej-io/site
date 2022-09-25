import {} from "react";

import type { NextPageWithLayout } from "next";

import { Head } from "~/components/core";
import { getMinimalPageLayout } from "~/components/layouts";

const NotFoundPage: NextPageWithLayout = () => {
  return (
    <>
      <Head title={{ prefix: "Not Found" }} />

      <div>NotFoundPage</div>
    </>
  );
};

NotFoundPage.getLayout = getMinimalPageLayout;

export default NotFoundPage;
