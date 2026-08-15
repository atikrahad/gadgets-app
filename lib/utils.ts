import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency = "USD") {
  const currencySymbol: Record<string, string> = {
    USD: "$",
    GBP: "£",
    EUR: "€",
    CAD: "C$",
    JPY: "¥",
  };

  const symbol = currencySymbol[currency] || "$";
  return `${symbol}${price.toFixed(2)}`;
}

export function truncateText(text: string, length: number) {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + "...";
}
