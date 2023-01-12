import { Arrow, ArrowKey } from '../../Primitives/Arrow';
import { CSSProperties, ReactNode, useCallback, useRef, useState } from 'react';
import { SpringValue, animated, useSpring } from '@react-spring/web';
import { useDrag, useGesture } from '@use-gesture/react';

import { NotificationText } from '../../Primitives/NotificationText';
import clsx from 'clsx';
import { useEffect } from '@storybook/addons';

//TODO
interface Props {
  showLayoutDebug?: boolean;
  children?: ReactNode;
  warningMessage?: string;
  manualX?: number;
  manualY?: number;
  keyStates?: Record<string, boolean>;
  onChange?: ({ x, y }: { x: number; y: number }) => void;
  width: number;
  arrowSmallness?: number;
  parentRef: React.MutableRefObject<HTMLDivElement>;
}

export const Joypad = ({ showLayoutDebug, onChange, width, arrowSmallness = 7, parentRef }: Props) => {
  // const [height, setHeight] = useState(null);
  // const [width, setWidth] = useState(null);

  // useEffect(() => {
  //   const resizeObserver = new ResizeObserver((event) => {
  //     // Depending on the layout, you may need to swap inlineSize with blockSize
  //     // https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentBoxSize
  //     setWidth(event[0].contentBoxSize[0].inlineSize);
  //     setHeight(event[0].contentBoxSize[0].blockSize);
  //     console.log('here');
  //   });

  //   inputRef?.current && resizeObserver.observe(inputRef?.current);
  // });

  const IDEAL_AREA = width;
  const TWO_THIRDS_AREA = (IDEAL_AREA * 2) / 3;
  const ONE_THIRD_AREA = (IDEAL_AREA * 1) / 3;
  const [{ x, y, opacity, up, down, left, right, upRight, upLeft, downRight, downLeft }, api] = useSpring(() => ({
    x: IDEAL_AREA / 2,
    y: IDEAL_AREA / 2,
    opacity: 0,
    up: 0,
    down: 0,
    left: 0,
    right: 0,
    upRight: 0,
    upLeft: 0,
    downRight: 0,
    downLeft: 0,
  }));
  const inputRef = useRef<HTMLDivElement>();
  const oldEffectiveX = useRef(0);
  const oldEffectiveY = useRef(0);

  const manualHighlight = ({ x, y }: { x: number; y: number }) => {
    api.start({
      upLeft: x === -1 && y === 1 ? 1 : 0,
      up: x === 0 && y === 1 ? 1 : 0,
      upRight: x === 1 && y === 1 ? 1 : 0,
      left: x === -1 && y === 0 ? 1 : 0,
      right: x === 1 && y === 0 ? 1 : 0,
      downLeft: x === -1 && y === -1 ? 1 : 0,
      down: x === 0 && y === -1 ? 1 : 0,
      downRight: x === 1 && y === -1 ? 1 : 0,
    });
  };

  const bind = useDrag(
    ({ down, xy: [ox, oy] }) => {
      console.log({ ox, oy });
      if (down) {
        const newX = Math.min(IDEAL_AREA, Math.max(0, ox - inputRef.current.offsetLeft - parentRef.current.offsetLeft));
        const newY = Math.min(IDEAL_AREA, Math.max(0, oy - inputRef.current.offsetTop - parentRef.current.offsetTop));
        const effectiveX = newX < ONE_THIRD_AREA ? -1 : newX > TWO_THIRDS_AREA ? 1 : 0;
        const effectiveY = newY < ONE_THIRD_AREA ? 1 : newY > TWO_THIRDS_AREA ? -1 : 0;
        if (effectiveX !== oldEffectiveX.current || effectiveY !== oldEffectiveY.current) {
          onChange({ x: effectiveX, y: effectiveY });
        }
        oldEffectiveX.current = effectiveX;
        oldEffectiveY.current = effectiveY;

        api.start({
          x: newX,
          y: newY,
          immediate: down,
          opacity: 0.5,
        });
        api.start({
          upLeft: effectiveX === -1 && effectiveY === 1 ? 1 : 0,
          up: effectiveX === 0 && effectiveY === 1 ? 1 : 0,
          upRight: effectiveX === 1 && effectiveY === 1 ? 1 : 0,
          left: effectiveX === -1 && effectiveY === 0 ? 1 : 0,
          right: effectiveX === 1 && effectiveY === 0 ? 1 : 0,
          downLeft: effectiveX === -1 && effectiveY === -1 ? 1 : 0,
          down: effectiveX === 0 && effectiveY === -1 ? 1 : 0,
          downRight: effectiveX === 1 && effectiveY === -1 ? 1 : 0,
        });
      } else {
        onChange({ x: 0, y: 0 });
        api.start({
          x: IDEAL_AREA / 2,
          y: IDEAL_AREA / 2,
          opacity: 0,
          up: 0,
          down: 0,
          left: 0,
          right: 0,
          upRight: 0,
          upLeft: 0,
          downRight: 0,
          downLeft: 0,
        });
      }
    },
    {
      // bounds: { left: 0, right: 400, top: 0, bottom: 400 },
    },
  );

  return (
    <>
      <div className="relative right-0 bottom-0" ref={inputRef} style={{ width: IDEAL_AREA, height: IDEAL_AREA }}>
        <animated.div
          className={clsx(
            'absolute top-0 left-0 grid h-full w-full grid-cols-3 grid-rows-3',
            showLayoutDebug && 'bg-red-100 bg-opacity-40',
          )}
          {...bind()}
        >
          <animated.div
            className={clsx(
              'flex h-full w-full items-center justify-center',
              showLayoutDebug && 'bg-green-100 bg-opacity-40',
            )}
          >
            <ArrowLayers
              arrowKey="up-left"
              opacity={upLeft}
              style={{
                width: Math.round(IDEAL_AREA / arrowSmallness),
                height: Math.round(IDEAL_AREA / arrowSmallness),
              }}
            />
          </animated.div>

          <animated.div
            className={clsx(
              'flex h-full w-full items-start justify-center',
              showLayoutDebug && 'bg-green-100 bg-opacity-40',
            )}
          >
            <ArrowLayers
              arrowKey="up"
              opacity={up}
              style={{
                width: Math.round(IDEAL_AREA / arrowSmallness),
                height: Math.round(IDEAL_AREA / arrowSmallness),
              }}
            />
          </animated.div>

          <animated.div
            className={clsx(
              'flex h-full w-full items-center justify-center',
              showLayoutDebug && 'bg-green-100 bg-opacity-40',
            )}
          >
            <ArrowLayers
              arrowKey="up-right"
              opacity={upRight}
              style={{
                width: Math.round(IDEAL_AREA / arrowSmallness),
                height: Math.round(IDEAL_AREA / arrowSmallness),
              }}
            />
          </animated.div>

          <animated.div
            className={clsx(
              'flex h-full w-full items-center justify-start',
              showLayoutDebug && 'bg-green-100 bg-opacity-40',
            )}
          >
            <ArrowLayers
              arrowKey="left"
              opacity={left}
              style={{ width: IDEAL_AREA / arrowSmallness, height: IDEAL_AREA / arrowSmallness }}
            />
          </animated.div>
          <div />

          <animated.div
            className={clsx(
              'flex h-full w-full items-center justify-end',
              showLayoutDebug && 'bg-green-100 bg-opacity-40',
            )}
          >
            <ArrowLayers
              arrowKey="right"
              opacity={right}
              style={{ width: IDEAL_AREA / arrowSmallness, height: IDEAL_AREA / arrowSmallness }}
            />
          </animated.div>

          <animated.div
            className={clsx(
              'flex h-full w-full items-center justify-center',
              showLayoutDebug && 'bg-green-100 bg-opacity-40',
            )}
          >
            <ArrowLayers
              arrowKey="down-left"
              opacity={downLeft}
              style={{
                width: Math.round(IDEAL_AREA / arrowSmallness),
                height: Math.round(IDEAL_AREA / arrowSmallness),
              }}
            />
          </animated.div>

          <animated.div
            className={clsx(
              'flex h-full w-full items-end justify-center',
              showLayoutDebug && 'bg-green-100 bg-opacity-40',
            )}
          >
            <ArrowLayers
              arrowKey="down"
              opacity={down}
              style={{
                width: Math.round(IDEAL_AREA / arrowSmallness),
                height: Math.round(IDEAL_AREA / arrowSmallness),
              }}
            />
          </animated.div>

          <animated.div
            className={clsx(
              'flex h-full w-full  items-center justify-center',
              showLayoutDebug && 'bg-green-100 bg-opacity-40',
            )}
          >
            <ArrowLayers
              arrowKey="down-right"
              opacity={downRight}
              style={{
                width: Math.round(IDEAL_AREA / arrowSmallness),
                height: Math.round(IDEAL_AREA / arrowSmallness),
              }}
            />
          </animated.div>
        </animated.div>
        <animated.div
          className="pointer-events-none transform rounded-full bg-primary-400"
          style={{
            x,
            y,
            opacity,
            translateX: -IDEAL_AREA / 10,
            translateY: -IDEAL_AREA / 10,
            width: IDEAL_AREA / 5,
            height: IDEAL_AREA / 5,
          }}
        />
      </div>
    </>
  );
};

function ArrowLayers({
  opacity,
  arrowKey,
  style,
}: {
  opacity: SpringValue<number>;
  arrowKey: ArrowKey;
  style?: CSSProperties;
}) {
  return (
    <div className="relative" style={style}>
      <div className="absolute top-0 left-0 bottom-0 right-0">
        <Arrow variant={arrowKey} className="text-gray-500" style={style} />
      </div>
      <animated.div style={{ opacity }} className="absolute top-0 left-0 bottom-0 right-0">
        <Arrow variant={arrowKey} className="text-purple-500" style={style} />
      </animated.div>
    </div>
  );
}
