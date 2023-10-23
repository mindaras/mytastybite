import { Fragment } from "react";
import { Optional } from "../Optional";
import { PaginationButton } from "./PaginationButton";
import styles from "./DynamicPagination.module.scss";
import { PaginationArrow } from "./PaginationArrow";

interface Props {
  page: number;
  total: number;
  onChange: (page: number) => void;
}

const DynamicPagination: React.FC<Props> = ({
  page: currentPage,
  total,
  onChange,
}) => {
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === total - 1;

  const renderPages = () => {
    const isAtTheStart = currentPage < 4;
    const isAtTheEnd = currentPage > total - 5;
    const startingPage = !isAtTheStart ? currentPage - 1 : 1;
    const pages = isAtTheStart
      ? [startingPage, startingPage + 1, startingPage + 2, startingPage + 3]
      : isAtTheEnd
      ? [total - 5, total - 4, total - 3, total - 2]
      : [startingPage, startingPage + 1, startingPage + 2];

    return (
      <Fragment>
        {pages.map((page) => (
          <PaginationButton
            key={page}
            active={page === currentPage}
            onClick={() => onChange(page)}
          >
            {page + 1}
          </PaginationButton>
        ))}
      </Fragment>
    );
  };

  const onPrevious = () => {
    if (currentPage > 0) onChange(currentPage - 1);
  };

  const onNext = () => {
    const nextPage = currentPage + 1;
    if (nextPage < total) onChange(nextPage);
  };

  return (
    <Fragment>
      <PaginationArrow
        direction="left"
        disabled={isFirstPage}
        onClick={onPrevious}
      />
      <PaginationButton active={isFirstPage} onClick={() => onChange(0)}>
        1
      </PaginationButton>
      <Optional if={currentPage > 3}>
        <div className={styles.dots}>...</div>
      </Optional>
      {renderPages()}
      <Optional if={currentPage < total - 4}>
        <div className={styles.dots}>...</div>
      </Optional>
      <PaginationButton active={isLastPage} onClick={() => onChange(total - 1)}>
        {total}
      </PaginationButton>
      <PaginationArrow
        direction="right"
        disabled={isLastPage}
        onClick={onNext}
      />
    </Fragment>
  );
};

export { DynamicPagination };
