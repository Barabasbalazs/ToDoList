export function formatShortDate(date: Date): string {
  return date.toLocaleDateString().split('/').join('.');
}
