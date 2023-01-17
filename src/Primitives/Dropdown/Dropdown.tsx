import { useEffect, useRef, useState } from 'react';

import { Button } from '../Button';
import { Chevron } from '../Chevron';
import clsx from 'clsx';
import { useOutsideClick } from '../../hooks/useOutsideClick';

type DropdownData = { id: string; label: string }[];
interface IDropdownProps {
  data: DropdownData;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xs';
  onSelectedIdChange?: (id: string) => void;
  onSelectedLabelChange?: (label: string) => void;
  initialSelectedId: string;
  notSelectedText?: string;
  showIds?: boolean;
  className?: string;
}

export function Dropdown({
  data,
  variant = 'primary',
  size = 'md',
  onSelectedIdChange,
  onSelectedLabelChange,
  initialSelectedId = '1',
  notSelectedText = 'Not selected',
  showIds = false,
  className,
}: IDropdownProps) {
  const [selected, setSelected] = useState(initialSelectedId);
  const [hidden, setHidden] = useState(true);
  const outsideClickRef = useOutsideClick(() => setHidden(true));
  const [buttonHeight, setButtonHeight] = useState(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((event) => {
      setButtonHeight(event[0].contentBoxSize[0].blockSize);
    });
    buttonRef?.current && resizeObserver.observe(buttonRef?.current);
  }, []);

  const selectedLabel = data?.find((x) => x.id === selected)?.label ?? notSelectedText;
  const buttonRef = useRef<HTMLDivElement>();
  return (
    <div className="relative" ref={outsideClickRef}>
      <div ref={buttonRef}>
        <Button
          variant={variant}
          size={size}
          onClick={() => {
            if (hidden) setHidden(false);
            else setHidden(true);
          }}
          className={clsx(!!className && className, '')}
        >
          {selectedLabel}
          <Chevron className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div
        style={{ transform: `translateY(${buttonHeight}px)` }}
        className={clsx(
          'transform-all rounded-xl duration-300',
          'absolute top-2 left-0 z-10 min-w-full divide-y divide-gray-100 bg-white shadow dark:divide-gray-600 dark:bg-gray-700',
          hidden && 'h-0 overflow-hidden',
        )}
      >
        <ul className="z-10 text-sm text-gray-700 dark:text-gray-200">
          {data?.map((x, i) => (
            <DropdownRadioItem
              showId={showIds}
              key={x.id}
              label={x.label}
              id={x.id}
              className={i === 0 ? 'rounded-t-lg' : i === data.length - 1 ? 'rounded-b-lg' : ''}
              isSelected={selected === x.id}
              setSelectedId={() => {
                setSelected(x.id);
                onSelectedIdChange?.(x.id);
                onSelectedLabelChange?.(x.label);
              }}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export interface IDropdownItemProps {
  label: string;
  id: string;
  isSelected: boolean;
  className?: string;
  setSelectedId: (id: string) => void;
  showId: boolean;
}

function DropdownRadioItem({ label, id, isSelected, setSelectedId, className, showId = false }: IDropdownItemProps) {
  return (
    <>
      <li>
        <a
          onClick={() => setSelectedId(id)}
          className={clsx(
            'flex cursor-pointer ',
            isSelected && ' bg-gray-400 dark:bg-gray-800',
            !isSelected && 'hover:bg-gray-100 dark:hover:bg-gray-600',
            !!className && className,
          )}
        >
          {/* <div className="flex h-5 items-center">
            <a
              id={id}
              type="radio"
              onClick={() => setSelectedId(id)}
              className={clsx(
                isSelected && 'bg-gray-600 dark:bg-gray-700',
                !isSelected && 'bg-gray-100 dark:bg-gray-600',
                'h-4 w-4 border-gray-300  text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-500  dark:ring-offset-gray-700 dark:focus:ring-primary-600',
              )}
            />
          </div> */}
          <div className="m-3 mx-5 block text-sm">
            <div
              className={clsx(
                isSelected && 'text-gray-900 dark:text-gray-300',
                !isSelected && 'text-gray-800 dark:text-gray-100',
                'font-medium',
              )}
            >
              <div>{label}</div>
              {showId && (
                <p id="helper-radio-text-4" className="break-all text-xs font-normal text-gray-500 dark:text-gray-300">
                  {id}
                </p>
              )}
            </div>
          </div>
        </a>
      </li>
    </>
  );
}
