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
import styles from "./UpdateArticleForm.module.scss";
import { config } from "@config";
import { api } from "@common/utils/api/client";
import { useFormErrors } from "@common/hooks/useFormErrors";
import { useModal } from "@common/hooks/useModal";
import { ConfirmationModalData } from "@common/components/modal/ConfirmationModal";
import { ButtonGroup } from "@common/components/form/buttonGroup/ButtonGroup";

export interface ArticleTextData {
  title: string;
  description: string;
  readTime: string;
  body: string;
}

interface ArticleFormData extends ArticleTextData {
  image: string | File;
  language: types.Language;
}

const validations: Validations = {
  title: [required({ message: "Required" })],
  description: [required({ message: "Required" })],
  readTime: [required({ message: "Required" })],
  body: [required({ message: "Required" })],
  image: [
    fileRequired({ allowString: true, message: "Required" }),
    imageMimeType({ message: "Invalid file type" }),
    fileSize({
      size: 3,
      units: "mb",
      message: "File is too big (maximum 3mb)",
    }),
  ],
};

interface Props {
  lang: types.Language;
  article: types.Article;
}

const UpdateArticleForm: React.FC<Props> = ({ lang, article }) => {
  const { formRef, showFormError, clearFormErrors } = useFormErrors();
  const { openModal } = useModal();
  const initialValues = {
    title: article.title,
    description: article.description,
    readTime: article.readTime,
    image: `${config.images.origin}/articles/${article.externalId}.jpg`,
    body: article.body,
  };

  const onSubmit = async (data: ArticleFormData) => {
    clearFormErrors();
    const formData = new FormData();
    formData.set("article", JSON.stringify(data));
    formData.set("language", lang);
    formData.set("image", data.image);
    const response = await api.patchRaw(
      `/cms/articles/${article.id}`,
      formData
    );
    if (response?.error) showFormError(response.error.message);
    else window.location.href = `/${lang}/cms/articles`;
  };

  const onDeleteConfirm = async () => {
    clearFormErrors();
    const response = await api.del(`/cms/articles/${article.id}`);
    if (response?.error) showFormError(response.error.message);
    else window.location.href = `/${lang}/cms/articles`;
  };

  const onDelete = () => {
    openModal<ConfirmationModalData>({
      type: "Confirmation",
      data: {
        title: "Are you sure you want to delete this article?",
        description:
          "By confirming, you'll delete this article for all languages.",
        cancelLabel: "Cancel",
        confirmLabel: "Delete",
        confirmVariant: "danger",
        onConfirm: onDeleteConfirm,
      },
    });
  };

  return (
    <div>
      <Form
        validations={validations}
        initialValues={initialValues}
        ref={formRef}
        className={styles.form}
        onSubmit={onSubmit}
      >
        {(context) => (
          <>
            <FormField name="title" type="text" />
            <FormField name="image" type="image" />
            <FormField name="description" type="textarea" />
            <FormField name="readTime" type="text" />
            <FormField name="body" type="texteditor" />
            <ButtonGroup reverseMobile>
              <Button
                type="button"
                variant="danger"
                disabled={context.isSubmitting}
                onClick={onDelete}
              >
                Delete
              </Button>
              <Button type="submit" disabled={context.isSubmitting}>
                {context.isSubmitting ? "Updating..." : "Update"}
              </Button>
            </ButtonGroup>
          </>
        )}
      </Form>
    </div>
  );
};

export { UpdateArticleForm };
