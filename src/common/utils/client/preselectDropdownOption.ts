import { DropdownOptions } from "@common/components/form/dropdown/Dropdown";

const preselectDropdownOption = (value: string, options: DropdownOptions) => {
  if (!value) return options;
  return options.map((option) => {
    return option.value === value ? { ...option, selected: true } : option;
  });
};

export { preselectDropdownOption };
