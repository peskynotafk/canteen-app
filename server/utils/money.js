
function rupeesToPaise(rupees) {
  if (typeof rupees !== "number" || !Number.isFinite(rupees) || rupees < 0) {
    throw new Error("Rupees must be a non-negative finite number");
  }

  const paise = Math.round(rupees * 100);

  if (!Number.isSafeInteger(paise)) {
    throw new Error("Price is too large");
  }

  return paise;
}

function paiseToRupees(paise) {
  if (!Number.isSafeInteger(paise) || paise < 0) {
    throw new Error("Paise must be a non-negative integer");
  }

  return paise / 100;
}

module.exports = {
  rupeesToPaise,
  paiseToRupees
};
