export function phoneFormat(ph: string) {
  const splitString = ph.slice(0, 4);
  return splitString.trim() + ph.slice(4, ph.length).trim();
}

export const wait = async (duration: number) => {
  await new Promise((res) => setTimeout(res, duration));
};

export const isValidTimeFormat = () => {
  
}
