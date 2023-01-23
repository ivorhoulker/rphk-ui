import * as React from 'react';

import { CloseButton } from '../../Primitives/CloseButton';
import { useOutsideClick } from '../../hooks/useOutsideClick';

interface Props {
  children?: React.ReactNode;
  heading?: string;
  paragraphs?: React.ReactNode[];
  buttons?: React.ReactNode[];
  onClose: () => void;
}
/**
 * A modal component with buttons, a title, and a close button in the top right.
 * @param children These are placed in the center of the modal, beneath any paragraphs you provide
 * @param paragraphs an array of paragraphs, can also be components, but they get wrapped in p tags. Better to use children for custom components.
 * @param heading the heading at the top
 * @param buttons an array of components - can be anything, but buttons are the idea
 */
export function Modal({ children, paragraphs, heading, onClose, buttons }: Props) {
  const outsideRef = useOutsideClick(onClose);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-30 min-h-full w-full min-w-full overflow-y-auto overflow-x-hidden bg-gray-500 bg-opacity-50 text-gray-900 dark:text-gray-50">
      <div className="flex h-full w-full min-w-full items-center justify-center">
        <div className="relative z-50 w-full h-full p-3 sm:p-0 sm:h-auto sm:max-w-xl lg:max-w-3xl">
          <div
            ref={outsideRef}
            className="rounded-lg bg-white shadow dark:bg-gray-800 w-full h-full sm:w-auto sm:h-auto"
          >
            <div className="flex items-start justify-between rounded-t border-b px-6 py-4 dark:border-gray-600">
              <h3 className="text-xl font-semibold">{heading}</h3>
              <CloseButton onClick={onClose} />
            </div>

            {!!paragraphs?.length && (
              <div className="space-y-6 p-6">
                {paragraphs?.map((para) => (
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">{para}</p>
                ))}
              </div>
            )}
            {!!children && <div className="space-y-6 p-6">{children}</div>}
            {!!buttons && (
              <div className="flex items-center space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600">
                {buttons}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
