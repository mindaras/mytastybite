import { QueryParams } from "src/types";

const toQueryString = (queryParams: QueryParams = {}) => {
  return Object.keys(queryParams).length
    ? `?${new URLSearchParams(queryParams).toString()}`
    : "";
};

export { toQueryString };
