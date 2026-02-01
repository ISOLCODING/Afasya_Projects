import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStorageUrl(path?: string) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  
  const baseUrl = import.meta.env.VITE_API_BASE_URL?.replace('/api/v1', '') || 'http://localhost:8000';
  return `${baseUrl}/storage/${path.replace(/^\/+/, '')}`;
}
