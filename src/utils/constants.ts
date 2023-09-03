import { generateRandomNumber } from "./code";

export const ERROR_REQUEST = {
  error: "error",
  message: "Request error, certain fields are missing",
};

export const name_image = (type: "pp" | "") => {
  return `exaderma_${type}_${generateRandomNumber(10)}.png`;
}