export function formatDate(timestamp: string): string {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(timestamp).toLocaleDateString(undefined, options)
}
