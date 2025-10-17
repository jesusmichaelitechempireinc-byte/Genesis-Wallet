import type { ComponentProps } from 'react';

export function CardanoIcon(props: ComponentProps<'svg'>) {
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
      <circle cx="12" cy="12" r="7" />
      <path d="M15 9l-3 3-3-3" />
      <path d="M9 15l3-3 3 3" />
    </svg>
  );
}
