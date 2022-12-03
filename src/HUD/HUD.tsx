import { ReactNode } from 'react';
import { Video } from '../Video';
interface Props {
  children?: ReactNode;
}
export const HUD = ({ children }: Props) => {
  return (
    <div className="relative h-full w-full shadow-inner">
      <Video />

      <div className="absolute top-0 left-0 grid h-full w-full grid-cols-5 grid-rows-5 gap-3 bg-red-100 opacity-40">
        <div className="col-span-2 row-span-2 flex items-start justify-start bg-green-100">Stats</div>
        <div className="row-span-2 flex items-start justify-center bg-green-100">Up</div>
        <div className="col-span-2 row-span-2 flex items-start justify-end bg-green-100">Map</div>
        <div className="flex items-center justify-start bg-green-100">Left</div>

        <div className="col-span-3 flex items-center justify-center bg-green-100">Warnings</div>
        <div className="flex items-center justify-end bg-green-100">Right</div>

        <div className="col-span-3 row-span-2 flex items-end justify-start bg-green-100">Chat</div>
        <div className="col-span-2 row-span-2 flex items-end justify-end bg-green-100">Buttons</div>
      </div>
      {children}
    </div>
  );
};
