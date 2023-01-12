import { ReactNode, useRef } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { useDrag, useGesture } from '@use-gesture/react';

import { Arrow } from '../../Primitives/Arrow';
import { NotificationText } from '../../Primitives/NotificationText';
import clsx from 'clsx';

//TODO
interface Props {
  showLayoutDebug: boolean;
  children?: ReactNode;
  warningMessage?: string;
}

export const Joypad = ({ children, showLayoutDebug, warningMessage }: Props) => {
  const [{ x, y, opacity }, api] = useSpring(() => ({ x: 100, y: 100, opacity: 0.1 }));
  const inputRef = useRef<HTMLDivElement>();
  const bind = useDrag(
    ({ down, values: [ox, oy], initial: [iy, ix] }) => {
      if (down) {
        console.log(inputRef.current.offsetLeft);
        api.start({
          x: Math.min(200, Math.max(0, ox - inputRef.current.offsetLeft)),
          y: Math.min(200, Math.max(0, oy - inputRef.current.offsetTop)),
          immediate: down,
          opacity: 1,
        });
      } else {
        api.start({ x: 100, y: 100, opacity: 0 });
      }
      console.log(ox, oy);
    },
    {
      // bounds: { left: 0, right: 400, top: 0, bottom: 400 },
    },
  );

  return (
    <>
      <div className="relative" ref={inputRef} style={{ width: 200, height: 200 }}>
        <animated.div
          className={clsx(
            'absolute top-0 left-0 grid h-full w-full grid-cols-3 grid-rows-3 gap-3',
            showLayoutDebug && 'bg-red-100 bg-opacity-40',
          )}
          {...bind()}
        >
          <div className={clsx('flex items-center justify-center', showLayoutDebug && 'bg-green-100 bg-opacity-40')}>
            <Arrow variant="up-left" />
          </div>
          <div className={clsx('flex items-start justify-center', showLayoutDebug && 'bg-green-100 bg-opacity-40')}>
            <Arrow variant="up" />
          </div>
          <div className={clsx('flex  items-center justify-center', showLayoutDebug && 'bg-green-100 bg-opacity-40')}>
            <Arrow variant="up-right" />
          </div>
          <div className={clsx('flex items-center justify-start', showLayoutDebug && 'bg-green-100 bg-opacity-40')}>
            <Arrow variant="left" />
          </div>
          <div />

          <div className={clsx('flex items-center justify-end', showLayoutDebug && 'bg-green-100 bg-opacity-40')}>
            <Arrow variant="right" />
          </div>
          <div className={clsx('flex  items-center justify-center', showLayoutDebug && 'bg-green-100 bg-opacity-40')}>
            <Arrow variant="down-left" />
          </div>

          <div className={clsx('flex items-end justify-center', showLayoutDebug && 'bg-green-100 bg-opacity-40')}>
            <Arrow variant="down" />
          </div>
          <div className={clsx('flex  items-center justify-center', showLayoutDebug && 'bg-green-100 bg-opacity-40')}>
            <Arrow variant="down-right" />
          </div>
        </animated.div>
        <animated.div
          className="pointer-events-none transform rounded-full bg-primary-400"
          style={{ x, y, opacity, translateX: -20, translateY: -20, width: 40, height: 40 }}
        />
      </div>
    </>
  );
};
