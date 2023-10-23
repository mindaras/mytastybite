import { Language } from "@types";

interface GroupDataByLanguageProps {
  data: object;
}

export type LanguageGroupedData<T = any> = Record<Language, T>;

// field names should be in the form of `name_language`
const groupDataByLanguage = <TData = any>({
  data,
}: GroupDataByLanguageProps) => {
  return Object.entries(data).reduce((acc, [key, value]) => {
    const [name, lang] = key.split("_");
    if (!acc[lang]) acc[lang] = {};
    acc[lang] = { ...acc[lang], [name]: value };
    return acc;
  }, {} as any) as LanguageGroupedData<TData>;
};

export { groupDataByLanguage };
