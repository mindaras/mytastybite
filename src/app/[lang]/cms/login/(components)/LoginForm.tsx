"use client";

import {
  LoginForm as Form,
  LoginFormData,
} from "@common/components/auth/cms/LoginForm";
import { api } from "@common/utils/api/client";
import { Translations } from "@i18n/loadTranslations";
import { Language } from "@types";

interface Props {
  lang: Language;
  translations: Translations;
}

const LoginForm: React.FC<Props> = ({ lang, translations }) => {
  const onSubmit = async (data: LoginFormData) => {
    const response = await api.post("/cms/auth/login", data);
    if (response?.success) window.location.href = `/${lang}/cms`;
  };

  return <Form translations={translations} onSubmit={onSubmit} />;
};

export { LoginForm };
