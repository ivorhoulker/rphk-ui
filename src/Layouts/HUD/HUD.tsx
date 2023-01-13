import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';

import { Button } from '../../Primitives/Button';
import { ChatView } from '../ChatView';
import { Joypad } from '../Joypad';
import { NotificationText } from '../../Primitives/NotificationText';
import { TextInput } from '../../Primitives/TextInput';
import { Tiltpad } from '../Tiltpad';
import clsx from 'clsx';
import useWindowDimensions from '../../hooks/useWindowDimensions';

//TODO
interface Props {
  showLayoutDebug: boolean;
  children?: ReactNode;
  warningMessage?: string;
  onXYChange: ({ x, y }: { x: number; y: number }) => void;
  onTiltChange: ({ y }: { y: number }) => void;
  onEmojiClick: (emojiName: string) => void;
  messages?: Array<{ uid: string; message: string; user: string }>;
}

export const HUD = ({
  children,
  showLayoutDebug,
  warningMessage,
  onXYChange,
  onTiltChange,
  onEmojiClick,
  messages,
}: Props) => {
  const inputRef = useRef<HTMLDivElement>();
  const wrapperRef = useRef<HTMLDivElement>();
  const [wrapperHeight, setWrapperHeight] = useState(null);
  const { isPortrait } = useWindowDimensions();

  useEffect(() => {
    const resizeObserver = new ResizeObserver((event) => {
      // Depending on the layout, you may need to swap inlineSize with blockSize
      // https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentBoxSize
      // setWidth(event[0].contentBoxSize[0].inlineSize);
      setWrapperHeight(event[0].contentBoxSize[0].blockSize);
    });
    wrapperRef?.current && resizeObserver.observe(wrapperRef?.current);
  }, []);

  console.log({ isPortrait });
  if (isPortrait) {
    return (
      <div className="relative h-full w-full" ref={inputRef}>
        <div>{children}</div>

        <div
          className={clsx(
            'absolute top-0 left-0 grid h-full w-full grid-cols-3 grid-rows-5 gap-1',
            showLayoutDebug && 'bg-red-100 bg-opacity-40',
          )}
        >
          <div
            className={clsx(
              'col-span-2 row-span-1 flex items-start justify-start',
              showLayoutDebug && 'bg-green-100 bg-opacity-40',
            )}
          >
            Stats
          </div>

          <div
            className={clsx(
              'col-span-1 row-span-1 flex items-start justify-end',
              showLayoutDebug && 'bg-green-100 bg-opacity-40',
            )}
          >
            Map
          </div>

          <div
            className={clsx(
              'col-span-3 flex items-center justify-center',
              showLayoutDebug && 'bg-green-100 bg-opacity-40',
            )}
          >
            {!!warningMessage && (
              <NotificationText variant="warning" size="lg">
                {warningMessage}
              </NotificationText>
            )}
          </div>

          <div
            className={clsx(
              'col-span-3 row-span-1 flex items-end justify-start',
              showLayoutDebug && 'bg-green-100 bg-opacity-40',
            )}
          >
            <div className="flex h-full w-full flex-col p-3">
              <ChatView messages={messages} />
              <TextInput id="test" />
            </div>
          </div>
          <div className={clsx('col-span-3 row-span-2 p-3', showLayoutDebug && 'bg-green-100 bg-opacity-40')}>
            <div ref={wrapperRef} className={clsx('flex h-full w-full justify-between')}>
              <Tiltpad height={wrapperHeight || 110} onChange={onTiltChange} parentRef={inputRef} />
              <Joypad height={wrapperHeight || 110} onChange={onXYChange} parentRef={inputRef} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="relative h-full max-h-screen w-full overflow-hidden" ref={inputRef}>
      <div>{children}</div>

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
          {!!warningMessage && (
            <NotificationText variant="warning" size="lg">
              {warningMessage}
            </NotificationText>
          )}
        </div>
        <div className={clsx('flex items-center justify-end', showLayoutDebug && 'bg-green-100 bg-opacity-40')}>
          Right
        </div>

        <div
          className={clsx(
            'col-span-2 row-span-2 flex items-end justify-start bg-gradient-to-tr from-gray-900 via-transparent to-transparent opacity-50 transition-opacity duration-300 hover:opacity-90',
            showLayoutDebug && 'bg-green-100 bg-opacity-40',
          )}
        >
          <div className="flex max-h-full w-full flex-col">
            <ChatView messages={messages} />
            <TextInput id="test" />
          </div>
        </div>
        <div
          className={clsx(
            'row-span-2 flex items-end justify-center gap-1 pb-1  opacity-50 transition-opacity duration-300 hover:opacity-90',
            showLayoutDebug && 'bg-green-100 bg-opacity-40',
          )}
        >
          <Button variant="outline" size="xs" onClick={() => onEmojiClick('smile')}>
            <span className="text-2xl">😊</span>
          </Button>
          <Button variant="outline" size="xs" onClick={() => onEmojiClick('frown')}>
            <span className="text-2xl">☹️</span>
          </Button>
          <Button variant="outline" size="xs" onClick={() => onEmojiClick('yes')}>
            <span className="text-2xl">👍</span>
          </Button>
          <Button variant="outline" size="xs" onClick={() => onEmojiClick('no')}>
            <span className="text-2xl">🙅‍♂️</span>
          </Button>
        </div>
        <div
          className={clsx(
            'col-span-2 row-span-2 p-2 opacity-50 transition-opacity duration-300 hover:opacity-90',
            showLayoutDebug && 'bg-green-100 bg-opacity-40',
          )}
        >
          <div ref={wrapperRef} className={clsx('flex h-full w-full items-center justify-end')}>
            <Joypad height={wrapperHeight || 110} onChange={onXYChange} parentRef={inputRef} />
            <Tiltpad height={wrapperHeight || 110} onChange={onTiltChange} parentRef={inputRef} />
          </div>
        </div>
      </div>
    </div>
  );
};
