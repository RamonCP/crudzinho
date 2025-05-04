export function sanitizeNumber(num?: string) {
  const parsed = Number(num);
  return isNaN(parsed) ? null : parsed;
}
