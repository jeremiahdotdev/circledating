export const routerQueryAttributeToString = (
  queryProperty: string | string[] | undefined
) => {
  return Array.isArray(queryProperty) ? queryProperty[0] : queryProperty ?? "";
};
