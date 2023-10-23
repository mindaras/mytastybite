import { config } from "@config";
import { loadTranslations } from "@i18n/loadTranslations";
import { Language } from "@types";

interface Props {
  lang: Language;
  fallbackLang?: Language;
}

const getDefaultMetadata = ({
  lang: initialLang,
  fallbackLang = Language.EN,
}: Props) => {
  const lang = initialLang || fallbackLang;
  const translations = loadTranslations(lang);

  return {
    metadataBase: new URL(`${config.origin}/${lang}`),
    title: "My Tasty Bite",
    description: translations.metadata.home.description,
    keywords: translations.metadata.home.keywords,
    icons: {
      icon: `${config.origin}/favicon.ico`,
    },
    openGraph: {
      title: "My Tasty Bite",
      images: [
        {
          url: `${config.origin}/images/og.jpg`,
          width: 1024,
          height: 1024,
        },
      ],
      description: translations.metadata.home.description,
      url: `${config.origin}/${lang}`,
      siteName: "My Tasty Bite",
      locale: translations.metadata.home.locale,
      type: "website",
    },
    alternates: {
      languages: {
        "en-US": `${config.origin}/en`,
        "es-ES": `${config.origin}/es`,
      },
    },
  };
};

export { getDefaultMetadata };
