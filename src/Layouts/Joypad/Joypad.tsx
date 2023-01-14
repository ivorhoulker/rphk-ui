import { Arrow, ArrowKey } from '../../Primitives/Arrow';
import { CSSProperties, ReactNode, useEffect, useRef } from 'react';
import { SpringValue, animated, useSpring } from '@react-spring/web';

import clsx from 'clsx';
import { useDrag } from '@use-gesture/react';

//TODO
interface Props {
  showLayoutDebug?: boolean;
  children?: ReactNode;
  warningMessage?: string;
  manualX?: number;
  manualY?: number;
  keyStates?: Record<string, boolean>;
  onChange?: ({ x, y }: { x: number; y: number }) => void;
  height: number;
  arrowSmallness?: number;
  parentRef: React.MutableRefObject<HTMLDivElement>;
}

export const Joypad = ({ showLayoutDebug, onChange, height = 200, arrowSmallness = 7, parentRef }: Props) => {
  const keysUsed = ['w', 'a', 's', 'd', 'UpArrow', 'DownArrow', 'LeftArrow', 'RightArrow'];
  const ignoreIfActiveElementIsOneOf = ['input', 'textarea']; //'select', 'button', might be added if we were using e.g. enter key

  const keyStates = useRef<Record<string, boolean>>({});
  const inputRef = useRef<HTMLDivElement>();
  const oldEffectiveX = useRef(0);
  const oldEffectiveY = useRef(0);

  const activeElementIsInputField = () => {
    const activeElement = document?.activeElement;
    return activeElement && ignoreIfActiveElementIsOneOf.indexOf(activeElement.tagName.toLowerCase()) !== -1;
  };

  // if alt+tab or click another tab while holding a move key, then reset keys and send 0,0 signal
  const onBlur = () => {
    keyStates.current = {};
    onChange({ x: 0, y: 0 });
  };
  useEffect(() => {
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('blur', onBlur);
    };
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
      onChange({ x, y });
      manualHighlight({ x, y });
    }
  };

  const onKeyup = (event: KeyboardEvent) => {
    if (activeElementIsInputField()) return;
    if (keysUsed.includes(event.key)) event.preventDefault();

    delete keyStates.current[event.key];
    const { x, y } = getXYFromKeyStates(keyStates.current);
    if (x !== oldEffectiveX.current || y !== oldEffectiveY.current) {
      oldEffectiveX.current = x;
      oldEffectiveY.current = y;
      onChange({ x, y });
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
  }, []);

  const IDEAL_AREA = Math.min(200, height);
  const THUMB_SIZE = IDEAL_AREA / 5;
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

  const bind = useDrag(({ down, xy: [ox, oy], buttons }) => {
    console.log({ buttons });
    if (isKeyboardControlling(keyStates.current)) return; // disable joypad drag control if keyboard keys to control movement are held down
    if (down) {
      const newX = Math.min(
        IDEAL_AREA - THUMB_SIZE / 2,
        Math.max(THUMB_SIZE / 2, ox - inputRef.current.offsetLeft - (parentRef?.current?.offsetLeft || 0)),
      );
      const newY = Math.min(
        IDEAL_AREA - THUMB_SIZE / 2,
        Math.max(
          THUMB_SIZE / 2,
          oy - inputRef.current.offsetTop - (parentRef?.current?.offsetTop || 0) + window.scrollY,
        ),
      );
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
  }, {});

  return (
    <>
      <div className="relative right-0 bottom-0" ref={inputRef} style={{ width: IDEAL_AREA, height: IDEAL_AREA }}>
        <animated.div
          className={clsx(
            'absolute top-0 left-0 grid h-full w-full grid-cols-3 grid-rows-3',
            showLayoutDebug && 'bg-red-100 bg-opacity-40',
          )}
          {...bind()}
          style={{ padding: THUMB_SIZE / 5 }}
        >
          <animated.div
            className={clsx(
              'flex h-full w-full items-center justify-center',
              showLayoutDebug && 'bg-green-100 bg-opacity-40',
            )}
          >
            <ArrowLayers
              arrowKey="up-left"
              activeOpacity={upLeft}
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
              activeOpacity={up}
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
              activeOpacity={upRight}
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
              activeOpacity={left}
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
              activeOpacity={right}
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
              activeOpacity={downLeft}
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
              activeOpacity={down}
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
              activeOpacity={downRight}
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
            width: THUMB_SIZE,
            height: THUMB_SIZE,
          }}
        />
      </div>
    </>
  );
};

function ArrowLayers({
  activeOpacity,
  arrowKey,
  style,
}: {
  activeOpacity: SpringValue<number>;
  arrowKey: ArrowKey;
  style?: CSSProperties;
}) {
  return (
    <div className="relative" style={style}>
      <div className="absolute top-0 left-0 bottom-0 right-0">
        <Arrow variant={arrowKey} active={false} style={style} />
      </div>
      <animated.div style={{ opacity: activeOpacity }} className="absolute top-0 left-0 bottom-0 right-0">
        <Arrow variant={arrowKey} active={true} style={style} />
      </animated.div>
    </div>
  );
}
