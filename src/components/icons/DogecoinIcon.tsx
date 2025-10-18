import type { ComponentProps } from 'react';

export function DogecoinIcon(props: ComponentProps<'svg'>) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M10 12h.01" />
      <path d="M14 12h.01" />
      <path d="M15.5 15a3.5 3.5 0 0 0-7 0" />
    </svg>
  );
}
