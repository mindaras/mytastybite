"use client";

import { Button } from "@common/components/button/Button";
import { Form } from "@common/components/form/form/Form";
import { Validations } from "@common/components/form/form/FormContext";
import { FormField } from "@common/components/form/formField/FormField";
import {
  fileSize,
  imageMimeType,
  fileRequired,
  required,
} from "@common/utils/client/formValidations";
import * as types from "@types";
import styles from "./CreateArticleForm.module.scss";
import { api } from "@common/utils/api/client";
import { useFormErrors } from "@common/hooks/useFormErrors";
import { Tab, Tabs } from "@common/components/tabs/Tabs";
import { ButtonGroup } from "@common/components/form/buttonGroup/ButtonGroup";
import {
  LanguageGroupedData,
  groupDataByLanguage,
} from "@common/utils/client/form";

interface ArticleTextData {
  title: string;
  description: string;
  readTime: string;
  body: string;
}

export type LanguageGroupedArticleData = LanguageGroupedData<ArticleTextData>;

interface ArticleFormData extends LanguageGroupedArticleData {
  image: string | File;
}

const getValidations = () => {
  const languages = Object.values(types.Language);

  const validations = languages.reduce<Validations>((acc, lang) => {
    acc[`title_${lang}`] = [required({ message: "Required" })];
    acc[`description_${lang}`] = [required({ message: "Required" })];
    acc[`readTime_${lang}`] = [required({ message: "Required" })];
    acc[`body_${lang}`] = [required({ message: "Required" })];
    return acc;
  }, {});

  validations.image = [
    fileRequired({ allowString: true, message: "Required" }),
    imageMimeType({ message: "Invalid file type" }),
    fileSize({
      size: 3,
      units: "mb",
      message: "File is too big (maximum 3mb)",
    }),
  ];

  return validations;
};

interface Props {
  lang: types.Language;
}

const CreateArticleForm: React.FC<Props> = ({ lang }) => {
  const { formRef, showFormError, clearFormErrors } = useFormErrors();

  const onSubmit = async (data: ArticleFormData) => {
    clearFormErrors();
    const { image, ...textData } = data;
    const articles = groupDataByLanguage<ArticleTextData>({ data: textData });
    const formData = new FormData();
    formData.set("articles", JSON.stringify(articles));
    formData.set("image", data.image);
    const response = await api.postRaw("/cms/articles", formData);
    if (response?.error) showFormError(response.error.message);
    else window.location.href = `/${lang}/cms/articles`;
  };

  return (
    <div>
      <Form
        validations={getValidations()}
        ref={formRef}
        className={styles.form}
        onSubmit={onSubmit}
      >
        {(context) => (
          <>
            <FormField name="image" type="image" />
            <Tabs expand fullWidth className={styles.tabs}>
              {Object.values(types.Language).map((lang) => (
                <Tab key={lang} name={lang}>
                  <FormField
                    name={`title_${lang}`}
                    type="text"
                    placeholder="Title"
                  />
                  <FormField
                    name={`description_${lang}`}
                    type="textarea"
                    placeholder="Description"
                  />
                  <FormField
                    name={`readTime_${lang}`}
                    type="text"
                    placeholder="Read time"
                  />
                  <FormField name={`body_${lang}`} type="texteditor" />
                </Tab>
              ))}
            </Tabs>
            <ButtonGroup>
              <Button type="submit" disabled={context.isSubmitting}>
                {context.isSubmitting ? "Creating..." : "Create"}
              </Button>
            </ButtonGroup>
          </>
        )}
      </Form>
    </div>
  );
};

export { CreateArticleForm };
