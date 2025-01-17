export const decimalToPercent = (decimal, fractionDigits = 2) => {
  return (decimal * 100).toFixed(fractionDigits) + "%";
};
