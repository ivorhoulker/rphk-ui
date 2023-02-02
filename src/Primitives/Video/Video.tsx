import { VideoHTMLAttributes, forwardRef, useRef } from 'react';
import { animated, useSpring } from '@react-spring/web';

import clsx from 'clsx';
import { useEffect } from '@storybook/addons';

export interface Props extends VideoHTMLAttributes<HTMLVideoElement> {
  rotate?: '90' | '180' | '-90';
  flipHorizontal?: boolean;
  flipVertical?: boolean;
  aspect?: '16/9' | '4/3' | '9/16' | 'square';
  tilt?: number;
}

export const Video = forwardRef<HTMLVideoElement, Props>(function Video(
  {
    aspect,
    flipHorizontal,
    flipVertical,
    rotate,
    className,
    controls = false,
    muted = true,
    autoPlay = true,
    loop = true,
    tilt = 0,
    ...args
  },
  ref,
) {
  const keysUsed = ['w', 'a', 's', 'd', 'UpArrow', 'DownArrow', 'LeftArrow', 'RightArrow'];
  const ignoreIfActiveElementIsOneOf = ['input', 'textarea']; //'select', 'button', might be added if we were using e.g. enter key

  const [{ y }, api] = useSpring(() => ({
    y: 0,
  }));
  const activeElementIsInputField = () => {
    const activeElement = document?.activeElement;
    return activeElement && ignoreIfActiveElementIsOneOf.indexOf(activeElement.tagName.toLowerCase()) !== -1;
  };
  const keyStates = useRef<Record<string, boolean>>({});
  const onKeydown = (event: KeyboardEvent) => {
    if (activeElementIsInputField()) return;
    if (keysUsed.includes(event.key)) event.preventDefault();
    keyStates.current[event.key] = true;
    console.log({ keyStates: keyStates.current });
  };

  const onKeyup = (event?: KeyboardEvent) => {
    if (activeElementIsInputField()) return;
    if (event && keysUsed.includes(event.key)) event.preventDefault();

    if (event) delete keyStates.current[event.key];
  };
  // useEffect(() => {
  //   document.addEventListener('keydown', onKeydown);
  //   document.addEventListener('keyup', onKeyup);
  //   return () => {
  //     document.removeEventListener('keydown', onKeydown);
  //     document.removeEventListener('keyup', onKeyup);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return (
    <animated.div
      style={{ transform: `translateY(${y}px)` }}
      className={clsx(
        'flex max-h-full max-w-full flex-col justify-center overflow-visible bg-black',
        aspect === '16/9' && 'aspect-video',
        aspect === '9/16' && 'aspect-[9/16]',
        aspect === '4/3' && 'aspect-[4/3]',
        aspect === 'square' && 'aspect-square',
        !!className && className,
      )}
    >
      <video
        ref={ref}
        className={clsx(
          'h-full w-full grow overflow-visible',
          !rotate && 'object-cover',
          rotate && 'object-contain',
          rotate && !flipHorizontal && !flipVertical && 'scale-[1.78]',
          rotate && flipHorizontal && !flipVertical && 'scale-x-[-1.78] scale-y-[1.78]',
          rotate && !flipHorizontal && flipVertical && 'scale-x-[1.78] scale-y-[-1.78]',
          rotate && flipHorizontal && flipVertical && 'scale-x-[-1.78] scale-y-[-1.78]',
          flipHorizontal && !rotate && 'scale-x-flip',
          flipVertical && !rotate && 'scale-y-flip',
          rotate === '90' && 'rotate-90',
          rotate === '180' && 'rotate-180',
          rotate === '-90' && '-rotate-90',
        )}
        muted={muted}
        autoPlay={autoPlay}
        loop={loop}
        controls={controls}
        {...args}
      />
    </animated.div>
  );
});
