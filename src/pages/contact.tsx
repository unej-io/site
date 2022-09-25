import {} from "react";

import type { NextPageWithLayout } from "next";

import { Head } from "~/components/core";
import { getPageLayout } from "~/components/layouts";

const ContactPage: NextPageWithLayout = () => {
  return (
    <>
      <Head title={{ prefix: "Contact" }} />

      <div>ContactPage</div>
    </>
  );
};

ContactPage.getLayout = getPageLayout;

export default ContactPage;
