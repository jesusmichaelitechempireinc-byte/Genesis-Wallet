import type { ComponentProps } from 'react';

export function SolanaIcon(props: ComponentProps<'svg'>) {
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
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M7 8h4" />
      <path d="M7 12h4" />
      <path d="M7 16h4" />
      <path d="M13 8h4" />
      <path d="M13 12h4" />
      <path d="M13 16h4" />
    </svg>
  );
}
