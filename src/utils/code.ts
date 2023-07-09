import { v4 as uuidv4 } from 'uuid';

export function generateUUID(): string {
  return uuidv4();
}

export function generateRandomNumber(size: number = 1): number {
  return Math.floor(Math.random() * size);
}

export function generateRandomString(size: number = 1): string {
    return Math.random().toString(36).substring(size);
}