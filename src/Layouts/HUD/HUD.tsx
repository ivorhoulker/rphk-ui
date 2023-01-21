import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';

import { Button } from '../../Primitives/Button';
import { ChatInput } from '../../Primitives/ChatInput';
import { ChatView } from '../ChatView';
import { Joypad } from '../Joypad';
import { Modal } from '../Modal';
import { NotificationText } from '../../Primitives/NotificationText';
import { TextInput } from '../../Primitives/TextInput';
import { Tiltpad } from '../Tiltpad';
import clsx from 'clsx';
import { useSize } from '../../hooks/useSize';
import useWindowDimensions from '../../hooks/useWindowDimensions';

//TODO
export interface HUDProps {
  showLayoutDebug?: boolean;
  children?: ReactNode;
  warningMessage?: string;
  onXYChange?: ({ x, y }: { x: number; y: number }) => void;
  onTiltChange?: ({ y }: { y: number }) => void;
  onEmojiClick?: (emojiName: string) => void;
  onSubmitMessage?: (messageText: string) => void;
  onLogOut?: () => Promise<void>;
  messages?: Array<{ id: string; message: string; user: string }>;
  settingsChildren?: ReactNode;
  mockMessageSubmit?: boolean;
  topLeft?: ReactNode;
}

export const HUD = ({
  children,
  showLayoutDebug,
  warningMessage,
  onXYChange,
  onTiltChange,
  onEmojiClick,
  onSubmitMessage,
  onLogOut,
  topLeft,
  messages,
  settingsChildren,
  mockMessageSubmit = false,
}: HUDProps) => {
  const inputRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  // const [wrapperHeight, setWrapperHeight] = useState<number>();
  const { isPortrait } = useWindowDimensions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mockMessages, setMockMessages] = useState(messages);
  const { height: wrapperHeight } = useSize(wrapperRef);

  const handleSubmitMessage = (v: string) => {
    onSubmitMessage?.(v);
    if (mockMessageSubmit) {
      const test = { id: 'hmm', message: v, user: 'Me' };
      setMockMessages((old) => (old?.length ? [...old, test] : [test]));
    }
  };

  const onModalClose = () => {
    setIsModalOpen(false);
  };
  const SettingsButton = () => {
    return (
      <Button hotKey="`" variant="outline" size="xs" onClick={() => setIsModalOpen((v) => !v)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </Button>
    );
  };

  const EmojiButtons = ({ emojiClass = 'text-2xl' }: { emojiClass?: string }) => {
    return (
      <>
        <Button hotKey="1" variant="outline" size="xs" onClick={() => onEmojiClick?.('😊')}>
          <span className={emojiClass}>😊</span>
        </Button>
        <Button hotKey="2" variant="outline" size="xs" onClick={() => onEmojiClick?.('☹️')}>
          <span className={emojiClass}>☹️</span>
        </Button>
        <Button hotKey="3" variant="outline" size="xs" onClick={() => onEmojiClick?.('👍')}>
          <span className={emojiClass}>👍</span>
        </Button>
        <Button hotKey="4" variant="outline" size="xs" onClick={() => onEmojiClick?.('🙅‍♂️')}>
          <span className={emojiClass}>🙅‍♂️</span>
        </Button>
      </>
    );
  };

  const SettingsModal = () => {
    return (
      <>
        {isModalOpen && (
          <Modal
            onClose={onModalClose}
            heading="Settings"
            paragraphs={[<div>Adjust your settings.</div>, settingsChildren]}
            buttons={[
              <Button variant="primary" onClick={onModalClose}>
                Done
              </Button>,
            ]}
          />
        )}
      </>
    );
  };

  const ChatBox = () => {
    return (
      <>
        <ChatView className="z-10 w-full" messages={mockMessageSubmit ? mockMessages : messages} />
        <ChatInput
          id="chat"
          className="z-10 pl-2 pb-2 text-black"
          placeholder="Press Enter to type..."
          onValueSubmit={handleSubmitMessage}
        />
      </>
    );
  };

  if (isPortrait) {
    return (
      <>
        <div className="relative h-full w-full" ref={inputRef}>
          <div>{children}</div>
          <div className="absolute top-0 left-0 flex h-full w-full flex-col items-end justify-end">
            <div className="flex h-1/3 w-full flex-col bg-gradient-to-t from-gray-900 via-transparent to-transparent ">
              <ChatBox />
            </div>
          </div>
          <div
            className={clsx(
              'absolute top-0 left-0 grid h-full w-full grid-cols-5 grid-rows-5 gap-1',
              showLayoutDebug && 'bg-red-100 bg-opacity-40',
            )}
          >
            <div
              className={clsx(
                'col-span-3 row-span-1 flex items-start justify-start',
                showLayoutDebug && 'bg-green-100 bg-opacity-40',
              )}
            >
              {showLayoutDebug && 'Stats? Debug console?'}
              {topLeft && topLeft}
            </div>

            <div
              className={clsx(
                'col-span-2 row-span-1 flex items-start justify-end',
                showLayoutDebug && 'bg-green-100 bg-opacity-40',
              )}
            >
              <div className="p-1">
                <SettingsButton />
              </div>
            </div>

            <div
              ref={tiltRef}
              className={clsx(
                'col-span-1 row-span-2 flex items-center justify-start',
                showLayoutDebug && 'bg-green-100 bg-opacity-40',
              )}
            >
              <Tiltpad height={wrapperHeight || 110} onChange={onTiltChange} parentRef={inputRef} />
            </div>
            <div
              className={clsx(
                'col-span-3 row-span-2 flex items-center justify-center',
                showLayoutDebug && 'bg-green-100 bg-opacity-40',
              )}
            >
              {!!warningMessage ||
                (showLayoutDebug && (
                  <NotificationText variant="warning" size="lg">
                    {warningMessage || showLayoutDebug ? 'Warning' : ''}
                  </NotificationText>
                ))}
            </div>
            <div
              id="emoji"
              className={clsx(
                'col-span-1 row-span-2 flex flex-col items-end justify-center gap-1 pr-1',
                showLayoutDebug && 'bg-green-100 bg-opacity-40',
              )}
            >
              <EmojiButtons emojiClass="text-lg" />
            </div>

            <div
              ref={wrapperRef}
              className={clsx('col-span-5 row-span-2 pb-14', showLayoutDebug && 'bg-green-100 bg-opacity-40')}
            >
              <div className={clsx('flex h-full w-full items-end justify-end')}>
                <Joypad className="z-20" height={wrapperHeight || 110} onChange={onXYChange} parentRef={inputRef} />
              </div>
            </div>
          </div>
        </div>
        <SettingsModal />
      </>
    );
  }
  return (
    <>
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
            {showLayoutDebug && 'Stats? Debug console?'}
            {topLeft && topLeft}
          </div>
          <div
            className={clsx(
              'row-span-2 flex items-start justify-center',
              showLayoutDebug && 'bg-green-100 bg-opacity-40',
            )}
          >
            {showLayoutDebug && 'Up'}
          </div>
          <div
            className={clsx(
              'col-span-2 row-span-2 flex items-start justify-end',
              showLayoutDebug && 'bg-green-100 bg-opacity-40',
            )}
          >
            <div className="p-5">
              <SettingsButton />
            </div>
          </div>
          <div className={clsx('flex items-center justify-start', showLayoutDebug && 'bg-green-100 bg-opacity-40')}>
            {showLayoutDebug && 'Left'}
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
            {showLayoutDebug && 'Right'}
          </div>

          <div
            className={clsx(
              'col-span-2 row-span-2 flex items-end justify-start bg-gradient-to-tr from-gray-900 via-transparent to-transparent opacity-50 transition-opacity duration-300 hover:opacity-90',
              showLayoutDebug && 'bg-green-100 bg-opacity-40',
            )}
          >
            <div className="flex max-h-full w-full flex-col">
              <ChatBox />
            </div>
          </div>
          <div
            className={clsx(
              'row-span-2 flex items-end justify-center gap-1 pb-1  opacity-50 transition-opacity duration-300 hover:opacity-90',
              showLayoutDebug && 'bg-green-100 bg-opacity-40',
            )}
          >
            <EmojiButtons />
          </div>
          <div
            ref={wrapperRef}
            className={clsx(
              'col-span-2 row-span-2 p-2 opacity-50 transition-opacity duration-300 hover:opacity-90',
              showLayoutDebug && 'bg-green-100 bg-opacity-40',
            )}
          >
            <div className={clsx('flex h-full w-full items-end justify-end')}>
              <Joypad height={wrapperHeight || 110} onChange={onXYChange} parentRef={inputRef} />
              <Tiltpad height={wrapperHeight || 110} onChange={onTiltChange} parentRef={inputRef} />
            </div>
          </div>
        </div>
      </div>
      <SettingsModal />
    </>
  );
};
