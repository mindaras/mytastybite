"use client";

import { useEffect, useState } from "react";
import styles from "./Dropdown.module.scss";
import classNames from "classnames";
import { Optional } from "@common/components/Optional";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Skeleton } from "@common/components/loader/Skeleton";

export interface DropdownOption {
  text: string;
  value: string | number | undefined;
  selected?: boolean;
}

export type DropdownOptions = DropdownOption[];

interface Props {
  options: DropdownOptions;
  label?: string;
  noneText?: string;
  preselect?: boolean;
  disabled?: boolean;
  containerClassName?: string;
  dropdownClassName?: string;
  selectedClassName?: string;
  onChange: (option: DropdownOption) => void;
}

const Dropdown: React.FC<Props> = ({
  options,
  label,
  noneText = "None",
  preselect,
  disabled,
  containerClassName,
  dropdownClassName,
  selectedClassName,
  onChange,
}) => {
  const [isLoading, setLoading] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<
    DropdownOption | undefined
  >();
  const availableOptions = options?.filter(
    (option) => option.value !== selectedOption?.value
  );

  const noneOption = { text: noneText, value: undefined };

  if (!preselect && selectedOption?.value !== noneOption.value) {
    availableOptions?.unshift(noneOption);
  }

  const isDisabled = disabled || !availableOptions?.length;

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isDisabled) setOpen(!isOpen);
  };

  const close = () => {
    setOpen(false);
  };

  useEffect(() => {
    const preselectedOption = options?.find((option) => option.selected);

    if (options?.length && (preselectedOption || preselect)) {
      setSelectedOption(preselectedOption || options[0]);
    }

    window.addEventListener("click", close as any);
    setLoading(false);
    return () => window.removeEventListener("click", close as any);
  }, [options]);

  const changeHandler = (option: DropdownOption) => {
    setSelectedOption(option);
    onChange(option);
  };

  return (
    <div
      className={classNames(
        styles.container,
        {
          [styles.container__loading]: isLoading,
          [styles.container__disabled]: isDisabled,
        },
        containerClassName
      )}
    >
      <Optional data={label}>
        <Optional
          if={isLoading}
          then={<Skeleton className={styles.label} width="50%" height="17px" />}
          else={<div className={styles.label}>{label}</div>}
        />
      </Optional>
      <div
        tabIndex={0}
        className={classNames(styles.dropdown, dropdownClassName)}
        onClick={toggle}
      >
        <Optional if={isLoading}>
          <Skeleton width="100%" height="100%" />
        </Optional>
        <Optional if={!isLoading}>
          <div className={classNames(styles.selected, selectedClassName)}>
            <span>
              {selectedOption?.text === noneText ? "" : selectedOption?.text}
            </span>
            <Optional if={isOpen}>
              <FontAwesomeIcon icon={faChevronUp} />
            </Optional>
            <Optional if={!isOpen}>
              <FontAwesomeIcon icon={faChevronDown} />
            </Optional>
          </div>
          <div
            className={classNames(styles.list, { [styles.list__open]: isOpen })}
          >
            {availableOptions?.map((option, i) => (
              <div
                key={i}
                className={styles.option}
                onClick={() => changeHandler(option)}
              >
                {option.text}
              </div>
            ))}
          </div>
        </Optional>
      </div>
    </div>
  );
};

export { Dropdown };
