import { Arrow, ArrowKey } from '../../Primitives/Arrow';
import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';
import { SpringValue, animated, useSpring } from '@react-spring/web';

import clsx from 'clsx';
import { string } from 'zod';
import { useDrag } from '@use-gesture/react';

//TODO
export interface JoypadProps {
  showLayoutDebug?: boolean;
  children?: ReactNode;
  warningMessage?: string;
  manualX?: number;
  manualY?: number;
  keyStates?: Record<string, boolean>;
  onChange?: ({ x, y }: { x: number; y: number }) => void;
  height: number;
  arrowSmallness?: number;
  parentRef: React.RefObject<HTMLDivElement>;
  className?: string;
}

export const Joypad = ({
  showLayoutDebug,
  onChange,
  height = 200,
  arrowSmallness = 7,
  parentRef,
  className,
}: JoypadProps) => {
  const keysUsed = ['w', 'a', 's', 'd', 'UpArrow', 'DownArrow', 'LeftArrow', 'RightArrow'];
  const ignoreIfActiveElementIsOneOf = ['input', 'textarea']; //'select', 'button', might be added if we were using e.g. enter key

  const keyStates = useRef<Record<string, boolean>>({});
  const inputRef = useRef<HTMLDivElement>(null);
  const oldEffectiveX = useRef(0);
  const oldEffectiveY = useRef(0);

  const activeElementIsInputField = () => {
    const activeElement = document?.activeElement;
    return activeElement && ignoreIfActiveElementIsOneOf.indexOf(activeElement.tagName.toLowerCase()) !== -1;
  };

  // if alt+tab or click another tab while holding a move key, then reset keys and send 0,0 signal
  const onBlur = () => {
    keyStates.current = {};

    onChange?.({ x: 0, y: 0 });
  };
  useEffect(() => {
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('blur', onBlur);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isKeyboardControlling = (states: Record<string, boolean>) => {
    return (
      states.w ||
      states.ArrowUp ||
      states.a ||
      states.ArrowLeft ||
      states.s ||
      states.ArrowDown ||
      states.d ||
      states.ArrowRight
    );
  };

  const getXYFromKeyStates = (states: Record<string, boolean>) => {
    let x = 0;
    let y = 0;
    if (states.w || states.ArrowUp) y += 1;
    if (states.a || states.ArrowLeft) x -= 1;
    if (states.s || states.ArrowDown) y -= 1;
    if (states.d || states.ArrowRight) x += 1;
    return { x, y };
  };
  const onKeydown = (event: KeyboardEvent) => {
    if (activeElementIsInputField()) return;
    if (keysUsed.includes(event.key)) event.preventDefault();

    keyStates.current[event.key] = true;
    const { x, y } = getXYFromKeyStates(keyStates.current);
    if (x !== oldEffectiveX.current || y !== oldEffectiveY.current) {
      oldEffectiveX.current = x;
      oldEffectiveY.current = y;
      onChange?.({ x, y });
      manualHighlight({ x, y });
    }
  };

  const onKeyup = (event?: KeyboardEvent) => {
    if (activeElementIsInputField()) return;
    if (event && keysUsed.includes(event.key)) event.preventDefault();

    if (event) delete keyStates.current[event.key];
    const { x, y } = getXYFromKeyStates(keyStates.current);
    if (x !== oldEffectiveX.current || y !== oldEffectiveY.current) {
      oldEffectiveX.current = x;
      oldEffectiveY.current = y;
      onChange?.({ x, y });
      manualHighlight({ x, y });
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', onKeydown);
    document.addEventListener('keyup', onKeyup);
    return () => {
      document.removeEventListener('keydown', onKeydown);
      document.removeEventListener('keyup', onKeyup);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onChange]);

  const IDEAL_AREA = Math.min(200, height);
  const THUMB_SIZE = IDEAL_AREA / 5;
  const TWO_THIRDS_AREA = (IDEAL_AREA * 2) / 3;
  const ONE_THIRD_AREA = (IDEAL_AREA * 1) / 3;
  // const [{ x, y, opacity, up, down, left, right, upRight, upLeft, downRight, downLeft }, api] = useSpring(() => ({
  //   x: IDEAL_AREA / 2,
  //   y: IDEAL_AREA / 2,
  //   opacity: 0,
  //   up: 0,
  //   down: 0,
  //   left: 0,
  //   right: 0,
  //   upRight: 0,
  //   upLeft: 0,
  //   downRight: 0,
  //   downLeft: 0,
  // }));

  const [active, setActive] = useState<Record<string, number>>({});

  const manualHighlight = ({ x, y }: { x: number; y: number }) => {
    // api.start({
    //   upLeft: x === -1 && y === 1 ? 1 : 0,
    //   up: x === 0 && y === 1 ? 1 : 0,
    //   upRight: x === 1 && y === 1 ? 1 : 0,
    //   left: x === -1 && y === 0 ? 1 : 0,
    //   right: x === 1 && y === 0 ? 1 : 0,
    //   downLeft: x === -1 && y === -1 ? 1 : 0,
    //   down: x === 0 && y === -1 ? 1 : 0,
    //   downRight: x === 1 && y === -1 ? 1 : 0,
    // });

    setActive({
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

  const bind = useDrag(({ down, xy: [ox, oy], buttons }) => {
    if (isKeyboardControlling(keyStates.current)) return; // disable joypad drag control if keyboard keys to control movement are held down
    if (down) {
      const newX = Math.min(
        IDEAL_AREA - THUMB_SIZE / 2,
        Math.max(THUMB_SIZE / 2, ox - (inputRef?.current?.offsetLeft ?? 0) - (parentRef?.current?.offsetLeft || 0)),
      );
      const newY = Math.min(
        IDEAL_AREA - THUMB_SIZE / 2,
        Math.max(
          THUMB_SIZE / 2,
          oy - (inputRef?.current?.offsetTop ?? 0) - (parentRef?.current?.offsetTop || 0) + window.scrollY,
        ),
      );
      const effectiveX = newX < ONE_THIRD_AREA ? -1 : newX > TWO_THIRDS_AREA ? 1 : 0;
      const effectiveY = newY < ONE_THIRD_AREA ? 1 : newY > TWO_THIRDS_AREA ? -1 : 0;
      if (effectiveX !== oldEffectiveX.current || effectiveY !== oldEffectiveY.current) {
        onChange?.({ x: effectiveX, y: effectiveY });
      }
      oldEffectiveX.current = effectiveX;
      oldEffectiveY.current = effectiveY;

      // api.start({
      //   x: newX,
      //   y: newY,
      //   immediate: down,
      //   opacity: 0.5,
      // });
      // api.start({
      //   upLeft: effectiveX === -1 && effectiveY === 1 ? 1 : 0,
      //   up: effectiveX === 0 && effectiveY === 1 ? 1 : 0,
      //   upRight: effectiveX === 1 && effectiveY === 1 ? 1 : 0,
      //   left: effectiveX === -1 && effectiveY === 0 ? 1 : 0,
      //   right: effectiveX === 1 && effectiveY === 0 ? 1 : 0,
      //   downLeft: effectiveX === -1 && effectiveY === -1 ? 1 : 0,
      //   down: effectiveX === 0 && effectiveY === -1 ? 1 : 0,
      //   downRight: effectiveX === 1 && effectiveY === -1 ? 1 : 0,
      // });
      setActive({
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
      onChange?.({ x: 0, y: 0 });
      // api.start({
      //   x: IDEAL_AREA / 2,
      //   y: IDEAL_AREA / 2,
      //   opacity: 0,
      //   up: 0,
      //   down: 0,
      //   left: 0,
      //   right: 0,
      //   upRight: 0,
      //   upLeft: 0,
      //   downRight: 0,
      //   downLeft: 0,
      // });
      setActive({
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
  }, {});

  return (
    <>
      <div
        className={clsx('relative right-0 bottom-0', !!className && className)}
        ref={inputRef}
        style={{ width: IDEAL_AREA, height: IDEAL_AREA }}
      >
        <div
          className={clsx(
            'absolute top-0 left-0 grid h-full w-full grid-cols-3 grid-rows-3',
            showLayoutDebug && 'bg-red-100 bg-opacity-40',
          )}
          {...bind()}
          style={{ padding: THUMB_SIZE / 5, touchAction: 'none' }}
        >
          <div
            className={clsx(
              'flex h-full w-full items-center justify-center',
              showLayoutDebug && 'bg-green-100 bg-opacity-40',
            )}
          >
            <ArrowLayers
              active={!!active.upLeft}
              arrowKey="up-left"
              style={{
                width: Math.round(IDEAL_AREA / arrowSmallness),
                height: Math.round(IDEAL_AREA / arrowSmallness),
              }}
            />
          </div>

          <div
            className={clsx(
              'flex h-full w-full items-start justify-center',
              showLayoutDebug && 'bg-green-100 bg-opacity-40',
            )}
          >
            <ArrowLayers
              active={!!active.up}
              arrowKey="up"
              style={{
                width: Math.round(IDEAL_AREA / arrowSmallness),
                height: Math.round(IDEAL_AREA / arrowSmallness),
              }}
            />
          </div>

          <div
            className={clsx(
              'flex h-full w-full items-center justify-center',
              showLayoutDebug && 'bg-green-100 bg-opacity-40',
            )}
          >
            <ArrowLayers
              active={!!active.upRight}
              arrowKey="up-right"
              style={{
                width: Math.round(IDEAL_AREA / arrowSmallness),
                height: Math.round(IDEAL_AREA / arrowSmallness),
              }}
            />
          </div>

          <div
            className={clsx(
              'flex h-full w-full items-center justify-start',
              showLayoutDebug && 'bg-green-100 bg-opacity-40',
            )}
          >
            <ArrowLayers
              active={!!active.left}
              arrowKey="left"
              style={{ width: IDEAL_AREA / arrowSmallness, height: IDEAL_AREA / arrowSmallness }}
            />
          </div>
          <div />

          <div
            className={clsx(
              'flex h-full w-full items-center justify-end',
              showLayoutDebug && 'bg-green-100 bg-opacity-40',
            )}
          >
            <ArrowLayers
              active={!!active.right}
              arrowKey="right"
              style={{ width: IDEAL_AREA / arrowSmallness, height: IDEAL_AREA / arrowSmallness }}
            />
          </div>

          <div
            className={clsx(
              'flex h-full w-full items-center justify-center',
              showLayoutDebug && 'bg-green-100 bg-opacity-40',
            )}
          >
            <ArrowLayers
              active={!!active.downLeft}
              arrowKey="down-left"
              style={{
                width: Math.round(IDEAL_AREA / arrowSmallness),
                height: Math.round(IDEAL_AREA / arrowSmallness),
              }}
            />
          </div>

          <div
            className={clsx(
              'flex h-full w-full items-end justify-center',
              showLayoutDebug && 'bg-green-100 bg-opacity-40',
            )}
          >
            <ArrowLayers
              active={!!active.down}
              arrowKey="down"
              style={{
                width: Math.round(IDEAL_AREA / arrowSmallness),
                height: Math.round(IDEAL_AREA / arrowSmallness),
              }}
            />
          </div>

          <div
            className={clsx(
              'flex h-full w-full  items-center justify-center',
              showLayoutDebug && 'bg-green-100 bg-opacity-40',
            )}
          >
            <ArrowLayers
              active={!!active.downRight}
              arrowKey="down-right"
              style={{
                width: Math.round(IDEAL_AREA / arrowSmallness),
                height: Math.round(IDEAL_AREA / arrowSmallness),
              }}
            />
          </div>
        </div>
        {/* <animated.div
          className="bg-primary-400 pointer-events-none rounded-full"
          style={{
            x,
            y,
            opacity: 1,
            translateX: -IDEAL_AREA / 10,
            translateY: -IDEAL_AREA / 10,
            width: THUMB_SIZE,
            height: THUMB_SIZE,
          }}
        /> */}
      </div>
    </>
  );
};

function ArrowLayers({ active, arrowKey, style }: { active: boolean; arrowKey: ArrowKey; style?: CSSProperties }) {
  return (
    <div className="relative" style={style}>
      <div className="absolute top-0 left-0 bottom-0 right-0">
        <Arrow variant={arrowKey} active={false} style={style} />
      </div>
      <div
        className={clsx(
          'absolute top-0 left-0 bottom-0 right-0 transition-opacity duration-300',
          active && 'opacity-100',
          !active && 'opacity-0',
        )}
      >
        <Arrow variant={arrowKey} active={true} style={style} />
      </div>
    </div>
  );
}
