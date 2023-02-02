import { Arrow, ArrowKey } from '../../Primitives/Arrow';
import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';
import { SpringValue, animated, useSpring } from '@react-spring/web';

import clsx from 'clsx';
import { string } from 'zod';
import { useDrag } from '@use-gesture/react';

//TODO
interface Props {
  showLayoutDebug?: boolean;
  children?: ReactNode;
  warningMessage?: string;
  manualX?: number;
  manualY?: number;
  keyStates?: Record<string, boolean>;
  onChange?: ({ y }: { y: number }) => void;
  onTiltReset?: () => void;
  height: number;
  arrowSmallness?: number;
  parentRef: React.RefObject<HTMLDivElement>;
}

export const Tiltpad = ({ showLayoutDebug, onChange, onTiltReset, height, arrowSmallness = 7, parentRef }: Props) => {
  const keysUsed = ['r', 'f', 'c'];
  const ignoreIfActiveElementIsOneOf = ['input', 'textarea']; //'select', 'button', might be added if we were using e.g. enter key

  const keyStates = useRef<Record<string, boolean>>({});
  const inputRef = useRef<HTMLDivElement>(null);
  const oldEffectiveY = useRef(0);

  // if alt+tab or click another tab while holding a tilt key, then reset keys and send 0,0 signal
  const onBlur = () => {
    keyStates.current = {};
    onChange?.({ y: 0 });
  };
  useEffect(() => {
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('blur', onBlur);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeElementIsInputField = () => {
    const activeElement = document?.activeElement;
    return !!(activeElement && ignoreIfActiveElementIsOneOf.includes(activeElement.tagName.toLowerCase()));
  };

  const isKeyboardControlling = (states: Record<string, boolean>) => {
    return states.r || states.f;
  };

  const getYFromKeyStates = (states: Record<string, boolean>) => {
    let y = 0;
    if (states.r) y += 1;
    if (states.f) y -= 1;
    return { y };
  };
  const onKeydown = (event: KeyboardEvent) => {
    if (activeElementIsInputField()) return;
    if (keysUsed.includes(event.key)) event.preventDefault();

    keyStates.current[event.key] = true;
    const { y } = getYFromKeyStates(keyStates.current);
    if (y !== oldEffectiveY.current) {
      oldEffectiveY.current = y;
      onChange?.({ y });
      manualHighlight({ y });
    }
    //single trigger
    if (event.key === 'c') {
      onTiltReset?.();
    }
  };

  const onKeyup = (event: KeyboardEvent) => {
    if (activeElementIsInputField()) return;
    if (keysUsed.includes(event.key)) event.preventDefault();

    delete keyStates.current[event.key];
    const { y } = getYFromKeyStates(keyStates.current);
    if (y !== oldEffectiveY.current) {
      oldEffectiveY.current = y;
      onChange?.({ y });
      manualHighlight({ y });
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

  const manualHighlight = ({ y }: { y: number }) => {
    setActive({
      up: y === 1 ? 1 : 0,
      down: y === -1 ? 1 : 0,
    });
  };

  const [active, setActive] = useState<Record<string, number>>();

  const bind = useDrag(({ down, xy: [, oy] }) => {
    if (isKeyboardControlling(keyStates.current)) return; // disable joypad drag control if keyboard keys to control movement are held down
    if (down) {
      const newY = Math.min(
        IDEAL_AREA - THUMB_SIZE / 2,
        Math.max(
          THUMB_SIZE / 2,
          oy - (inputRef?.current?.offsetTop ?? 0) - (parentRef?.current?.offsetTop || 0) + window.scrollY,
        ),
      );

      const effectiveY = newY < ONE_THIRD_AREA ? 1 : newY > TWO_THIRDS_AREA ? -1 : 0;
      if (effectiveY !== oldEffectiveY.current) {
        onChange?.({ y: effectiveY });
      }

      oldEffectiveY.current = effectiveY;

      setActive({
        up: effectiveY === 1 ? 1 : 0,

        down: effectiveY === -1 ? 1 : 0,
      });
    } else {
      onChange?.({ y: 0 });
      setActive({
        up: 0,
        down: 0,
      });
    }
  }, {});

  return (
    <>
      <div className="relative right-0 bottom-0" ref={inputRef} style={{ width: THUMB_SIZE * 1.5, height: IDEAL_AREA }}>
        <div
          className={clsx(
            'absolute top-0 left-0 grid h-full w-full grid-cols-1 grid-rows-3',
            showLayoutDebug && 'bg-red-100 bg-opacity-40',
          )}
          style={{ touchAction: 'none' }}
          {...bind()}
        >
          <div
            className={clsx(
              'flex h-full w-full items-start justify-center',
              showLayoutDebug && 'bg-green-100 bg-opacity-40',
            )}
            style={{ paddingTop: THUMB_SIZE / 5, touchAction: 'none' }}
          >
            <ArrowLayers
              arrowKey="up"
              active={!!active?.up}
              style={{
                width: IDEAL_AREA / arrowSmallness,
                height: IDEAL_AREA / arrowSmallness,
              }}
            />
          </div>

          <div />

          <div
            className={clsx(
              'flex h-full w-full items-end justify-center',
              showLayoutDebug && 'bg-green-100 bg-opacity-40',
            )}
            style={{ paddingBottom: THUMB_SIZE / 5 }}
          >
            <ArrowLayers
              arrowKey="down"
              active={!!active?.down}
              style={{
                width: IDEAL_AREA / arrowSmallness,
                height: IDEAL_AREA / arrowSmallness,
              }}
            />
          </div>
        </div>
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
