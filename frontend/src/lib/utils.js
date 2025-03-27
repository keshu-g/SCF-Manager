import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * @typedef {"kilogram" | "gram" | "liter" | "milliliter"} SupportedUnit
 * @typedef {"INR" | "USD" | "EUR"} CurrencyType
 * @typedef {"currency" | "unit"} FormatType
 */

/**
 * @param {Object} options
 * @param {number} options.quantity
 * @param {FormatType} [options.type]
 * @param {CurrencyType} [options.currency]
 * @param {SupportedUnit} [options.unit]
 */
export function formatValue({
  quantity,
  type = "unit",
  currency = "INR",
  unit = "",
}) {
  const numberFormatter = (options) =>
    new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 2,
      ...options,
    }).format(quantity);

  if (type === "currency") {
    return numberFormatter({ style: "currency", currency });
  }

  const supportedUnits = ["kilogram", "gram", "liter", "milliliter"];
  if (type === "unit" && supportedUnits.includes(unit)) {
    return numberFormatter({ style: "unit", unit });
  }

  // Fallback for pieces or custom units
  return `${numberFormatter()} ${unit}`;
}
