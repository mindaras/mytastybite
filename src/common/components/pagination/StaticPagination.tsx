import { Fragment } from "react";
import { PaginationButton } from "./PaginationButton";
import { PaginationArrow } from "./PaginationArrow";

interface Props {
  page: number;
  total: number;
  onChange: (page: number) => void;
}

const StaticPagination: React.FC<Props> = ({
  page: currentPage,
  total,
  onChange,
}) => {
  const onPrevious = () => {
    if (currentPage > 0) onChange(currentPage - 1);
  };

  const onNext = () => {
    const nextPage = currentPage + 1;
    if (nextPage !== total - 1) onChange(nextPage);
  };

  return (
    <Fragment>
      <PaginationArrow
        direction="left"
        disabled={currentPage === 0}
        onClick={onPrevious}
      />
      {new Array(total).fill("").map((_, page) => (
        <PaginationButton
          key={page}
          active={page === currentPage}
          onClick={() => onChange(page)}
        >
          {page + 1}
        </PaginationButton>
      ))}
      <PaginationArrow
        direction="right"
        disabled={currentPage === total - 1}
        onClick={onNext}
      />
    </Fragment>
  );
};

export { StaticPagination };
