"use client";

import { QueryParams } from "src/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  pathname?: string;
}

const useQueryParams = <T = QueryParams>({
  pathname: defaultPathname,
}: Props = {}) => {
  const { entries } = useSearchParams();
  const router = useRouter();
  const currentPathname = usePathname();
  const pathname = defaultPathname || currentPathname;

  const queryParams = Array.from(entries()).reduce<QueryParams>(
    (acc, [key, value]) => {
      acc[key] = value;
      return acc;
    },
    {}
  );

  const paramsExist = !!Object.keys(queryParams).length;

  const queryString = paramsExist
    ? `?${new URLSearchParams(queryParams).toString()}`
    : "";

  const setQueryParams = (params: QueryParams) => {
    if (!params && !paramsExist) return;

    const filteredParams: QueryParams = {};

    for (const key in params) {
      if (params[key]) filteredParams[key] = params[key];
    }

    const newParams = new URLSearchParams(filteredParams).toString();
    router.push(`${pathname}?${newParams}`);
  };

  return { queryParams: queryParams as T, queryString, setQueryParams };
};

export { useQueryParams };
