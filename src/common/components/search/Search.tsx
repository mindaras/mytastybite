"use client";

import { useCallback, useRef, useState } from "react";
import { debounce } from "@common/utils/client/debounce";
import { TextInput } from "../form/textInput/TextInput";
import { useQueryParams } from "@common/hooks/useQueryParams";

interface QueryParams {
  search?: string;
}

interface Props {
  pathname?: string;
  placeholder?: string;
  fullWidth?: boolean;
  fullWidthMobile?: boolean;
  disabled?: boolean;
  className?: string;
}

const Search: React.FC<Props> = ({
  pathname,
  placeholder = "Search...",
  fullWidth,
  fullWidthMobile,
  disabled,
  className,
}) => {
  const { queryParams, setQueryParams } = useQueryParams<QueryParams>({
    pathname,
  });
  const intialValueRef = useRef(queryParams?.search || "");
  const [value, setValue] = useState(intialValueRef.current);

  const debouncedOnChange = useCallback(
    debounce((value: string, params: QueryParams) => {
      setQueryParams({ ...params, search: value });
    }, 300),
    [pathname]
  );

  const onChange = (value: string, reset?: boolean) => {
    setValue(value);
    if (reset) setQueryParams({ ...queryParams, search: value });
    else debouncedOnChange(value, queryParams);
  };

  return (
    <TextInput
      name="search"
      placeholder={placeholder}
      value={value}
      fullWidth={fullWidth}
      fullWidthMobile={fullWidthMobile}
      disabled={disabled}
      className={className}
      onChange={onChange}
    />
  );
};

export { Search };
