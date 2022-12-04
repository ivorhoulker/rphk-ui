import { ReactNode } from 'react';
import { Video } from '../../Primitives/Video';
import clsx from 'clsx';
//TODO
interface Props {
  showLayoutDebug: boolean;
  children?: ReactNode;
}

export const HUD = ({ children, showLayoutDebug }: Props) => {
  return (
    <div className="relative h-full w-full shadow-inner">
      <Video />

      <div
        className={clsx(
          'absolute top-0 left-0 grid h-full w-full grid-cols-5 grid-rows-5 gap-3',
          showLayoutDebug && 'bg-red-100 bg-opacity-40',
        )}
      >
        <div
          className={clsx(
            'col-span-2 row-span-2 flex items-start justify-start',
            showLayoutDebug && 'bg-green-100 bg-opacity-40',
          )}
        >
          Stats
        </div>
        <div
          className={clsx(
            'row-span-2 flex items-start justify-center',
            showLayoutDebug && 'bg-green-100 bg-opacity-40',
          )}
        >
          Up
        </div>
        <div
          className={clsx(
            'col-span-2 row-span-2 flex items-start justify-end',
            showLayoutDebug && 'bg-green-100 bg-opacity-40',
          )}
        >
          Map
        </div>
        <div className={clsx('flex items-center justify-start', showLayoutDebug && 'bg-green-100 bg-opacity-40')}>
          Left
        </div>

        <div
          className={clsx(
            'col-span-3 flex items-center justify-center',
            showLayoutDebug && 'bg-green-100 bg-opacity-40',
          )}
        >
          Warnings
        </div>
        <div className={clsx('flex items-center justify-end', showLayoutDebug && 'bg-green-100 bg-opacity-40')}>
          Right
        </div>

        <div
          className={clsx(
            'col-span-3 row-span-2 flex items-end justify-start',
            showLayoutDebug && 'bg-green-100 bg-opacity-40',
          )}
        >
          Chat
        </div>
        <div
          className={clsx(
            'col-span-2 row-span-2 flex items-end justify-end',
            showLayoutDebug && 'bg-green-100 bg-opacity-40',
          )}
        >
          Buttons
        </div>
      </div>
      {children}
    </div>
  );
};
