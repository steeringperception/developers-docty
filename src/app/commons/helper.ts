export const encrypt = (int: any) => {
  if (!!!int) return;
  return btoa(int.toString()).replace(/=+/g, '');
}

export const decrypt = (str: string) => {
  if (!!!str) return;
  return atob(str);
}