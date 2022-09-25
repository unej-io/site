import {} from "react";

import type { NextPageWithLayout } from "next";

import { Head } from "~/components/core";
import { getPageLayout } from "~/components/layouts";

const FormPage: NextPageWithLayout = () => {
  return (
    <>
      <Head title={{ prefix: "Form" }} />

      <div>FormPage</div>
    </>
  );
};

FormPage.getLayout = getPageLayout;

export default FormPage;
