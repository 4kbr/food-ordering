export const convertToK = (angka: number) => {
  if (angka >= 1000) {
    const suffixes = ["", "k", "M", "B", "T"];
    const suffixNum = Math.floor(("" + angka).length / 3);
    let shortValue = parseFloat(
      (suffixNum != 0 ? angka / Math.pow(1000, suffixNum) : angka).toPrecision(
        2
      )
    );
    if (shortValue % 1 != 0) {
      shortValue = parseInt(shortValue.toFixed(1));
    }
    return shortValue + suffixes[suffixNum];
  }
  return angka;
};
