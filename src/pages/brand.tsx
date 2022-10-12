import {} from "react";

import type { NextPageWithLayout } from "next";

import { Head } from "~/components/core";
import { getPageLayout } from "~/components/layouts";

const BrandPage: NextPageWithLayout = () => {
  return (
    <>
      <Head title={{ prefix: "Brand" }} />

      <div>BrandPage</div>
    </>
  );
};

BrandPage.getLayout = getPageLayout;

export default BrandPage;
