import clsx from 'clsx';

interface IChevronProps {
  className?: string;
}

export function Chevron({ className = '' }: IChevronProps) {
  return (
    <svg
      className={clsx('ml-2 h-4 w-4', className)}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
    </svg>
  );
}
