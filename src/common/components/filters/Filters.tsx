"use client";

import styles from "./Filters.module.scss";
import {
  Dropdown,
  DropdownOption,
  DropdownOptions,
} from "../form/dropdown/Dropdown";
import classNames from "classnames";
import { useQueryParams } from "@common/hooks/useQueryParams";
import { preselectDropdownOption } from "@common/utils/client/preselectDropdownOption";

export interface Filter {
  name: string;
  options: DropdownOptions;
  label?: string;
  preselect?: boolean;
  disabled?: boolean;
}

export type Filters = Filter[];

interface Props {
  filters: Filters;
  align?: "left" | "right";
  noneText?: string;
  disabled?: boolean;
}

const Filters: React.FC<Props> = ({
  filters,
  align = "left",
  noneText,
  disabled,
}) => {
  const { queryParams, setQueryParams } = useQueryParams();

  const onChange = (name: string, option: DropdownOption) => {
    setQueryParams({ ...queryParams, page: null, [name]: option.value });
  };

  return (
    <div
      className={classNames(styles.filters, {
        [styles.filters__alignedRight]: align === "right",
      })}
    >
      {filters?.map((filter, i) => (
        <Dropdown
          key={i}
          options={preselectDropdownOption(
            queryParams[filter.name],
            filter.options
          )}
          label={filter.label}
          noneText={noneText}
          preselect={filter.preselect}
          disabled={disabled || filter.disabled}
          onChange={(option) => onChange(filter.name, option)}
        />
      ))}
    </div>
  );
};

export { Filters };
