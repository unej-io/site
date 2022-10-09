import {} from "react";
import type { PropsWithChildren } from "react";

type LinkRendererProps = PropsWithChildren<{}>;

function LinkRenderer(props: LinkRendererProps) {
  return (
    <>
      <div>LinkRenderer</div>
      {props.children}
    </>
  );
}

export type { LinkRendererProps };
export default LinkRenderer;
