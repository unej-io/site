import {} from "react";

import type { NextPageWithLayout } from "next";

import { Head } from "~/components/core";
import { getPageLayout } from "~/components/layouts";

const AboutPage: NextPageWithLayout = () => {
  return (
    <>
      <Head title={{ prefix: "About" }} />

      <div>AboutPage</div>
    </>
  );
};

AboutPage.getLayout = getPageLayout;

export default AboutPage;
