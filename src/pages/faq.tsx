import {} from "react";

import type { NextPageWithLayout } from "next";

import { Head } from "~/components/core";
import { getPageLayout } from "~/components/layouts";

const FAQPage: NextPageWithLayout = () => {
  return (
    <>
      <Head title={{ prefix: "FAQ" }} />

      <div>FAQPage</div>
    </>
  );
};

FAQPage.getLayout = getPageLayout;

export default FAQPage;
