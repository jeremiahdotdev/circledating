import { JsonValue } from "@prisma/client/runtime/library";

export function parseArray<T>(value: JsonValue): T[] {
  if (!Array.isArray(value)) return [] as T[];
  const result: string[] = [];
  value.forEach((el) => {
    if (el && typeof el === "string") result.push(el);
  });
  return result as T[];
}
