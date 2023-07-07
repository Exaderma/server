import { v4 as uuidv4 } from 'uuid';

export function generateUUID(): string {
  return uuidv4();
}

export function generateRandomNumber(size: number): number {
  return Math.floor(Math.random() * size);
}

export function generateRandomString(size: number): string {
    return Math.random().toString(36).substring(size);
}