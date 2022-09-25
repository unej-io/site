import {} from "react";

import type { NextPageWithLayout } from "next";

import { Head } from "~/components/core";
import { getPageLayout } from "~/components/layouts";

const DocumentationPage: NextPageWithLayout = () => {
  return (
    <>
      <Head title={{ prefix: "Documentation" }} />

      <div>DocumentationPage</div>
    </>
  );
};

DocumentationPage.getLayout = getPageLayout;

export default DocumentationPage;
