import { useEffect, useLayoutEffect, useRef } from 'react';

//TODO
interface Props {
  messages?: Array<{ uid: string; message: string; user: string }>;
}

export const ChatView = ({ messages }: Props) => {
  const scrollViewRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    scrollViewRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  }, [messages]);
  return (
    <div dir={'rtl'} className="right-to flex h-full max-h-full w-full flex-col overflow-y-scroll p-3 text-white">
      {messages?.map((x) => (
        <div dir={'ltr'} key={x.uid}>
          <span>{x.user}: </span>
          <span>{x.message}</span>
        </div>
      ))}
      <div ref={scrollViewRef}></div>
    </div>
  );
};
