export const ERROR = {
  NOT_FOUND: (entity: string = ""): string =>
    entity ? `${entity} is not found` : "Not found",
};
