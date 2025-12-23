import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Small helper to avoid messy className strings in components
export function cn(...inputs) {
  // clsx handles conditional classes, twMerge resolves Tailwind conflicts
  return twMerge(clsx(inputs));
}
