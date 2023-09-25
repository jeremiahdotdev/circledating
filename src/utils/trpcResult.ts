export function trpcResult(message: unknown, items?: unknown) {
  return { data: items ?? [], message: message };
}
