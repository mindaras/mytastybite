import { createContext } from "react";

interface Validation {
  validator: (data: any) => boolean;
  message: string;
}

type Validations = Record<string, Validation[]>;

interface Value {
  form: Record<string, any>;
  errors: Record<string, string>;
  submitErrors: string[];
  validations: Validations;
  isSubmitting: boolean;
  isSubmitted: boolean;
  setForm: (form: object) => void;
  setErrors: (errors: object) => void;
  setSubmitErrors: (messages: string[]) => void;
  setIsSubmitting: (data: boolean) => void;
  setIsSubmitted: (data: boolean) => void;
}

const FormContext = createContext<Value>({
  form: {},
  errors: {},
  submitErrors: [],
  validations: {},
  isSubmitting: false,
  isSubmitted: false,
  setForm: () => null,
  setErrors: () => null,
  setSubmitErrors: () => null,
  setIsSubmitting: () => null,
  setIsSubmitted: () => null,
});

export { FormContext };
export type { Validations, Validation };
