"use client";

import { Language } from "@types";
import {
  Dropdown,
  DropdownOption,
  DropdownOptions,
} from "../form/dropdown/Dropdown";
import styles from "./LanguagePicker.module.scss";
import { preselectDropdownOption } from "@common/utils/client/preselectDropdownOption";
import classNames from "classnames";
import { Optional } from "../Optional";

interface Props {
  lang: string;
  className?: string;
}

const LanguagePicker: React.FC<Props> = ({ lang, className }) => {
  const options: DropdownOptions = Object.entries(Language).map(
    ([text, value]) => ({ text, value })
  );

  const onChange = (option: DropdownOption) => {
    window.location.href = window.location.href.replace(
      `${window.location.origin}/${lang}`,
      `${window.location.origin}/${option.value}`
    );
  };

  return (
    <Optional if={options.length > 1}>
      <Dropdown
        containerClassName={classNames(styles.container, className)}
        dropdownClassName={styles.dropdown}
        selectedClassName={styles.selected}
        options={preselectDropdownOption(lang, options)}
        onChange={onChange}
        preselect
      />
    </Optional>
  );
};

export { LanguagePicker };
