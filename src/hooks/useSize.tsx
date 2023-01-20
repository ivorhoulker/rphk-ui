import { useLayoutEffect, useState } from 'react';

import useResizeObserver from '@react-hook/resize-observer';

export function useSize(target: React.RefObject<HTMLDivElement>) {
  const [height, setHeight] = useState<number>();
  const [width, setWidth] = useState<number>();

  useLayoutEffect(() => {
    if (target?.current) {
      const t = target?.current?.getBoundingClientRect();
      setHeight(t.height);
      setWidth(t.width);
    }
  }, [target]);

  // Where the magic happens
  useResizeObserver(target, (entry) => {
    setHeight(entry.contentBoxSize[0].blockSize);
    setWidth(entry.contentBoxSize[0].inlineSize);
  });
  return { height, width };
}
