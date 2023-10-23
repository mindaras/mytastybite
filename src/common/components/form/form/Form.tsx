import { ForwardedRef, forwardRef, useImperativeHandle, useState } from "react";
import { FormContext, Validations } from "./FormContext";
import { useForm } from "@common/hooks/useForm";
import { Optional } from "@common/components/Optional";
import { SubmitErrors } from "./SubmitErrors";

interface FormContext {
  isSubmitting: boolean;
  isSubmitted: boolean;
}

interface Props {
  validations?: Validations;
  initialValues?: object;
  ref?: ForwardedRef<any>;
  className?: string;
  onSubmit: (data: any) => Promise<any> | void;
  children: (context: FormContext) => React.ReactNode;
}

const Form: React.FC<Props> = ({ className, children, onSubmit }) => {
  const {
    form,
    submitErrors,
    isSubmitting,
    isSubmitted,
    validate,
    setIsSubmitting,
    setIsSubmitted,
    setSubmitErrors,
  } = useForm();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate()) {
      setIsSubmitting(true);
      await onSubmit(form);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  return (
    <form className={className} onSubmit={submitHandler}>
      {children({ isSubmitting, isSubmitted })}
      <Optional data={submitErrors}>
        <SubmitErrors
          messages={submitErrors}
          close={() => setSubmitErrors([])}
        />
      </Optional>
    </form>
  );
};

export interface SubmitErrorHandlers {
  showSubmitError: (message: string) => void;
  showSubmitErrors: (messages: string[]) => void;
  clearSubmitErrors: VoidFunction;
}

const WrappedForm: React.FC<Props> = forwardRef((props, ref) => {
  const [form, setForm] = useState(props.initialValues || {});
  const [submitErrors, setSubmitErrors] = useState<string[]>([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useImperativeHandle(
    ref,
    (): SubmitErrorHandlers => {
      return {
        showSubmitError: (message: string) => setSubmitErrors([message]),
        showSubmitErrors: (messages: string[]) => setSubmitErrors(messages),
        clearSubmitErrors: () => setSubmitErrors([]),
      };
    },
    []
  );

  return (
    <FormContext.Provider
      value={{
        form,
        errors,
        submitErrors,
        validations: props.validations || {},
        isSubmitting,
        isSubmitted,
        setForm,
        setErrors,
        setSubmitErrors,
        setIsSubmitting,
        setIsSubmitted,
      }}
    >
      <Form {...props} />
    </FormContext.Provider>
  );
});

export { WrappedForm as Form };
