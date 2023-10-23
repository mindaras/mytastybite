import { FormContext } from "@common/components/form/form/FormContext";
import { useContext } from "react";

interface UpdateFieldArgs {
  name: string;
  value: any;
}

interface SetErrorArgs {
  name: string;
  error: any;
}

type FormErrors = Record<string, string>;

const useForm = () => {
  const {
    form,
    validations,
    errors,
    submitErrors,
    isSubmitting,
    isSubmitted,
    setForm,
    setErrors,
    setSubmitErrors,
    setIsSubmitting,
    setIsSubmitted,
  } = useContext(FormContext);

  const updateField = ({ name, value }: UpdateFieldArgs) => {
    setForm({ ...form, [name]: value });

    if (errors[name]) {
      const errs = { ...errors };
      delete errs[name];
      setErrors(errs);
    }
  };

  const setError = ({ name, error }: SetErrorArgs) => {
    setErrors({ ...errors, [name]: error });
  };

  const validateSingle = (name: string) => {
    const validation = validations[name];

    if (!validation) return true;

    const validationError = validation.find(
      (validation) => !validation.validator(form[name])
    );

    if (!validationError) return;

    setError({ name, error: validationError.message });
  };

  const validate = (name?: string) => {
    if (name) return validateSingle(name);

    if (Object.keys(errors).length) return false;

    const validationEntries = Object.entries(validations);

    if (!validationEntries.length) return true;

    const validationErrors = validationEntries
      .map(([name, validations]) => {
        const validationError = validations.find(
          (validation) => !validation.validator(form[name])
        );

        return {
          name,
          isValid: !validationError,
          message: validationError?.message,
        };
      })
      .filter((result) => !result.isValid);

    if (!validationErrors.length) return true;

    const formErrors = validationErrors.reduce<FormErrors>((acc, curr) => {
      acc[curr.name] = curr.message as string;
      return acc;
    }, {});

    setErrors(formErrors);

    return false;
  };

  return {
    form,
    validations,
    errors,
    submitErrors,
    isSubmitting,
    isSubmitted,
    updateField,
    setError,
    setErrors,
    setSubmitErrors,
    validate,
    setIsSubmitting,
    setIsSubmitted,
  };
};

export { useForm };
export type { FormErrors };
