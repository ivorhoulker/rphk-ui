import { VideoHTMLAttributes } from 'react';

import clsx from 'clsx';

interface Props extends VideoHTMLAttributes<HTMLVideoElement> {}
export const Video = ({ className, ...args }: Props) => {
  return (
    <div className="h-full w-full bg-black hue-rotate-90">
      <video
        src="/test_video.webm"
        className={clsx([!!className && className, 'h-full w-full object-cover'])}
        muted
        autoPlay
        loop
        controls={false}
        {...args}
      />
    </div>
  );
};
