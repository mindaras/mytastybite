"use client";

import { Optional } from "@common/components/Optional";
import styles from "./ContactForm.module.scss";
import { Button } from "@common/components/button/Button";
import { Form } from "@common/components/form/form/Form";
import { Validations } from "@common/components/form/form/FormContext";
import { FormField } from "@common/components/form/formField/FormField";
import { required } from "@common/utils/client/formValidations";
import { api } from "@common/utils/api/client";
import { Translations } from "@i18n/loadTranslations";

export interface ContactFormData {
  email: string;
  message: string;
}

interface Props {
  translations: Translations;
}

const ContactForm: React.FC<Props> = ({ translations }) => {
  const validations: Validations = {
    email: [required({ message: translations.form.validation.required })],
    message: [required({ message: translations.form.validation.required })],
  };

  const onSubmit = async (data: ContactFormData) => {
    return api.post("/contact", data);
  };

  return (
    <Form className={styles.form} validations={validations} onSubmit={onSubmit}>
      {(context) => (
        <>
          <Optional if={context.isSubmitted}>
            {translations.contact.form.success}
          </Optional>
          <Optional if={!context.isSubmitted}>
            <FormField
              name="email"
              type="email"
              placeholder={translations.contact.form.email}
            />
            <FormField
              name="message"
              type="textarea"
              placeholder={translations.contact.form.message}
            />
            <Button type="submit" disabled={context.isSubmitting}>
              {context.isSubmitting
                ? translations.contact.form.sending
                : translations.contact.form.send}
            </Button>
          </Optional>
        </>
      )}
    </Form>
  );
};

export { ContactForm };
