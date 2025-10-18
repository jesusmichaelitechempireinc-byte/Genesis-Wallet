import type { ComponentProps } from 'react';

export function RippleIcon(props: ComponentProps<'svg'>) {
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
      <circle cx="12" cy="12" r="1" />
      <path d="M17.5 17.5c2.5-2.5 2.5-6.5 0-9s-6.5-2.5-9 0" />
      <path d="M6.5 6.5c-2.5 2.5-2.5 6.5 0 9s6.5 2.5 9 0" />
    </svg>
  );
}
