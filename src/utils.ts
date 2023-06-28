export function euroValue(value: string | number | undefined) {
  if (typeof value == "undefined" || value === "") {
    return "";
  }

  let toFormat = value;
  if (typeof value == "string") {
    toFormat = value.replace(",", ".");
  }

  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(Number(toFormat));
}
