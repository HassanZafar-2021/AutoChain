const formatPrice = (amount, currency = "USD", locale = "en-US") => {
  if (typeof amount !== "number" || isNaN(amount)) {
    console.error("Invalid amount passed to formatPrice:", amount);
    return "N/A";
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: currency === "SOL" ? 4 : 2,
    maximumFractionDigits: currency === "SOL" ? 4 : 2,
  }).format(amount);
};

export default formatPrice;
