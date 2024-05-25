export function phoneFormat(ph: string) {
  const splitString = ph.slice(0, 4);
  return splitString.trim() + ph.slice(4, ph.length).trim();
}
