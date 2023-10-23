import { TextInput } from "../textInput/TextInput";
import { TextArea } from "../textarea/Textarea";
import styles from "./FormField.module.scss";
import { useForm } from "@common/hooks/useForm";
import { Optional } from "@common/components/Optional";
import { FormFieldError } from "./FormFieldError";
import classNames from "classnames";
import { TextEditor } from "../textEditor/TextEditor";
import { ImageInput } from "../imageInput/ImageInput";

interface Props {
  name: string;
  type?: "text" | "textarea" | "texteditor" | "email" | "password" | "image";
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  imageAlt?: string;
  className?: string;
  inputClassName?: string;
}

const FormField: React.FC<Props> = ({
  name,
  type = "text",
  label,
  placeholder,
  disabled,
  imageAlt,
  className,
  inputClassName,
}) => {
  const { form, errors, updateField, validate } = useForm();
  const value = form[name] ?? "";
  const error = errors[name];

  const onChange = (value: string | File) => {
    updateField({ name, value });
  };

  const onBlur = () => {
    validate(name);
  };

  const renderField = () => {
    switch (type) {
      case "textarea":
        return (
          <TextArea
            name={name}
            placeholder={placeholder}
            value={value}
            fullWidth
            disabled={disabled}
            className={inputClassName}
            onChange={onChange}
            onBlur={onBlur}
          />
        );
      case "texteditor":
        return (
          <TextEditor
            initialValue={value}
            fullWidth
            disabled={disabled}
            className={inputClassName}
            onChange={onChange}
          />
        );
      case "image":
        return (
          <ImageInput
            name={name}
            placeholder={placeholder}
            value={value}
            fullWidth
            disabled={disabled}
            imageAlt={imageAlt}
            className={inputClassName}
            onChange={onChange}
          />
        );
      default:
        return (
          <TextInput
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            fullWidth
            disabled={disabled}
            className={inputClassName}
            onChange={onChange}
            onBlur={onBlur}
          />
        );
    }
  };

  return (
    <div
      className={classNames(
        styles.container,
        { [styles.error]: !!error },
        className
      )}
    >
      <Optional data={label}>
        <span className={styles.label}>{label}</span>
      </Optional>
      {renderField()}
      <Optional data={error}>
        <FormFieldError error={error} />
      </Optional>
    </div>
  );
};

export { FormField };
