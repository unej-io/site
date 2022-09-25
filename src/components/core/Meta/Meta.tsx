import {} from "react";

import { APP } from "~/const/app";

function Meta() {
  return (
    <>
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${APP.link.self}/`} />
      <meta property="og:title" content={APP.description} />
      <meta property="og:description" content={APP.description} />
      <meta property="og:image" content={`${APP.link.self}/Cover.png`} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={`${APP.link.self}/`} />
      <meta property="twitter:title" content={APP.description} />
      <meta property="twitter:description" content={APP.description} />
      <meta property="twitter:image" content={`${APP.link.self}/Cover.png`} />
    </>
  );
}

export default Meta;
