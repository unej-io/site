import type { DynamicOptionsLoadingProps } from "next/dynamic";

import { CenterLoader, ErrorAlert } from "@unej-io/ui/core";

function Loading({ error }: DynamicOptionsLoadingProps) {
  if (error) return <ErrorAlert title="Error!" message={error.message} />;
  return <CenterLoader />;
}

export default Loading;
