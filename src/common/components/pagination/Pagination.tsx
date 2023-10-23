"use client";

import classNames from "classnames";
import { Optional } from "../Optional";
import { DynamicPagination } from "./DynamicPagination";
import { StaticPagination } from "./StaticPagination";
import styles from "./Pagination.module.scss";
import { useQueryParams } from "@common/hooks/useQueryParams";

interface Props {
  total: number;
  disabled?: boolean;
}

const Pagination: React.FC<Props> = ({ total, disabled }) => {
  const { queryParams, setQueryParams } = useQueryParams<{
    page: string;
  }>();
  const page = parseInt(queryParams?.page ?? 1) - 1;

  const changeHandler = (page: number) => {
    if (disabled) return;
    setQueryParams({ ...queryParams, page: page ? page + 1 : null });
  };

  return (
    <Optional if={total > 1}>
      <div
        className={classNames(styles.container, {
          [styles.container__disabled]: disabled,
        })}
      >
        <Optional if={total > 7}>
          <DynamicPagination
            page={page}
            total={total}
            onChange={changeHandler}
          />
        </Optional>
        <Optional if={total <= 7}>
          <StaticPagination
            page={page}
            total={total}
            onChange={changeHandler}
          />
        </Optional>
      </div>
    </Optional>
  );
};

export { Pagination };
