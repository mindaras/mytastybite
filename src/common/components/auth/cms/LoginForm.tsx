"use client";

import styles from "./LoginForm.module.scss";
import { Button } from "@common/components/button/Button";
import { Form } from "@common/components/form/form/Form";
import { Validations } from "@common/components/form/form/FormContext";
import { FormField } from "@common/components/form/formField/FormField";
import { required } from "@common/utils/client/formValidations";
import { Translations } from "@i18n/loadTranslations";

export interface LoginFormData {
  username: string;
  password: string;
}

interface Props {
  translations: Translations;
  onSubmit: (data: LoginFormData) => void;
}

const LoginForm: React.FC<Props> = ({ translations, onSubmit }) => {
  const validations: Validations = {
    username: [required({ message: translations.form.validation.required })],
    password: [required({ message: translations.form.validation.required })],
  };

  return (
    <Form className={styles.form} validations={validations} onSubmit={onSubmit}>
      {(context) => (
        <>
          <FormField
            name="username"
            type="text"
            placeholder={translations.cms.login.username}
          />
          <FormField
            name="password"
            type="password"
            placeholder={translations.cms.login.password}
          />
          <Button type="submit" disabled={context.isSubmitting}>
            {translations.cms.login.login}
          </Button>
        </>
      )}
    </Form>
  );
};

export { LoginForm };
