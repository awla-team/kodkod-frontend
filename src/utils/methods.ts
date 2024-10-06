import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...classes: ClassValue[]): string {
  return twMerge(clsx(...classes));
}

export function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: '#646cff',
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}
