import { Language } from "src/types";
import { loadTranslations } from "@i18n/loadTranslations";
import { Login } from "./Login";

interface Props {
  params: {
    lang: Language;
  };
}

const LoginPage: React.FC<Props> = ({ params: { lang } }) => {
  const translations = loadTranslations(lang);
  return <Login lang={lang} translations={translations} />;
};

export default LoginPage;
