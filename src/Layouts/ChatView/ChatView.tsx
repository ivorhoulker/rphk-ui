import { useLayoutEffect, useRef } from 'react';

import clsx from 'clsx';

//TODO
export interface ChatViewProps {
  className?: string;
  messages?: Array<{ id: string; message: string; user: string }>;
}

export const ChatView = ({ messages, className }: ChatViewProps) => {
  const scrollViewRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    scrollViewRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  }, [messages]);
  return (
    <div
      dir={'rtl'}
      className={clsx(
        'text-md flex h-full max-h-full w-full flex-col overflow-y-scroll p-1 text-white',
        !!className && className,
      )}
    >
      {messages?.map((x) => (
        <div dir={'ltr'} key={x.id}>
          <span>{x.user}: </span>
          <span>{x.message}</span>
        </div>
      ))}
      <div ref={scrollViewRef}></div>
    </div>
  );
};
