import { VideoHTMLAttributes } from 'react';
import clsx from 'clsx';

interface Props extends VideoHTMLAttributes<HTMLVideoElement> {
  rotate?: '90' | '180' | '-90';
  flipHorizontal?: boolean;
  flipVertical?: boolean;
  aspect?: '16/9' | '4/3' | '9/16' | 'square';
}

export const Video = ({
  aspect,
  flipHorizontal,
  flipVertical,
  rotate,
  className,
  controls = false,
  muted = true,
  autoPlay = true,
  loop = true,
  src = '/test_video.webm',
  ...args
}: Props) => {
  return (
    <div
      className={clsx(
        'flex max-h-full max-w-full flex-col justify-center overflow-hidden bg-black',
        aspect === '16/9' && 'aspect-video',
        aspect === '9/16' && 'aspect-[9/16]',
        aspect === '4/3' && 'aspect-[4/3]',
        aspect === 'square' && 'aspect-square',
        !!className && className,
      )}
    >
      <video
        src={src}
        className={clsx(
          'h-full w-full grow',
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
    </div>
  );
};
