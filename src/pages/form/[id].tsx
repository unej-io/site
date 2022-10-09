import {} from "react";

import type { GetServerSideProps, NextPageWithLayout } from "next";

import { Head } from "~/components/core";
import {} from "~/components/layouts";

type Props = {
  form: {
    title: string;
  };
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      form: {
        title: "Some title",
      },
    },
  };
};

const FormByIdPage: NextPageWithLayout<Props> = (props) => {
  const { form } = props;

  return (
    <>
      <Head title={{ prefix: `Form ${form.title}` }} />

      <div>FormByIdPage</div>
    </>
  );
};

export default FormByIdPage;
