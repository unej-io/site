import { memo, useCallback } from "react";
import type { ReactNode } from "react";

import { Affix, Button, Transition } from "@mantine/core";
import type { TransitionProps } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";

import { IconArrowUp } from "@tabler/icons";

const position = { bottom: 20, right: 20 };

function TransitionDiv(props: Omit<TransitionProps, "children"> & { children?: ReactNode }) {
  const { children, ...rest } = props;
  return <Transition {...rest}>{(style) => <div style={style}>{props.children}</div>}</Transition>;
}

function ScrollToTop() {
  const [scroll, scrollTo] = useWindowScroll();

  const handleClick = useCallback(() => {
    scrollTo({ y: 0 });
  }, []);

  return (
    <Affix position={position} withinPortal>
      <TransitionDiv transition="pop" mounted={scroll.y > 17}>
        <Button leftIcon={<IconArrowUp size={16} />} onClick={handleClick}>
          Scroll to top
        </Button>
      </TransitionDiv>
    </Affix>
  );
}

export default memo(ScrollToTop);
