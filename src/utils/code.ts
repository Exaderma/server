import { v4 as uuidv4 } from "uuid";

export function generateUUID(): string {
  return uuidv4();
}

export function generateRandomNumber(size: number = 1): number {
  let number = 0;
  for (let i = 0; i < size; i++) {
    number += Math.floor(Math.random() * 10);
  }
  return number;
}

export function generateRandomString(size: number = 1): string {
  let string = "";
  for (let i = 0; i < size; i++) {
    string += String.fromCharCode(97 + Math.floor(Math.random() * 26));
  }
  return string;
}
