import type { ComponentProps } from 'react';

export function BitcoinIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M11.768 16.096c4.096-1.07 4.096-4.45 0-5.52M14.053 8.847l-2.285 8.347" />
      <path d="M8 12.5h8" />
      <path d="M12 18V6" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}
