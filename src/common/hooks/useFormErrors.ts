import { SubmitErrorHandlers } from "@common/components/form/form/Form";
import { useRef } from "react";

const useFormErrors = () => {
  const formRef = useRef<SubmitErrorHandlers>();

  const showFormError = (message: string) => {
    return formRef.current?.showSubmitError(message);
  };

  const showFormErrors = (messages: string[]) => {
    return formRef.current?.showSubmitErrors(messages);
  };

  const clearFormErrors = () => {
    formRef.current?.clearSubmitErrors();
  };

  return { formRef, showFormError, showFormErrors, clearFormErrors };
};

export { useFormErrors };
