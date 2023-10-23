import { Validation } from "@common/components/form/form/FormContext";
import { FileSizeUnits, validateFileSize } from "../file";

interface ValidationProps {
  message: string;
}

const required = ({ message }: ValidationProps): Validation => ({
  validator: (data: string | Array<any>) => !!data?.length,
  message,
});

interface FileRequiredProps extends ValidationProps {
  allowString?: boolean;
}

const fileRequired = ({
  allowString,
  message,
}: FileRequiredProps): Validation => {
  return {
    validator: (data: File | string) => {
      if (!data) return false;
      if (allowString && typeof data === "string") return !!data.length;
      if (!(data instanceof File)) return false;
      return true;
    },
    message,
  };
};

type MimeType = "image/jpeg" | "image/png";

interface FileMimeTypeProps extends ValidationProps {
  allowedMimeTypes: MimeType[];
}

const fileMimeType = ({
  allowedMimeTypes,
  message,
}: FileMimeTypeProps): Validation => ({
  validator: (file: File) => {
    if (!(file instanceof File)) return true;
    return allowedMimeTypes.includes(file.type as MimeType);
  },
  message,
});

interface FileSizeProps extends ValidationProps {
  size: number;
  units: FileSizeUnits;
}

const fileSize = ({ size, units, message }: FileSizeProps): Validation => ({
  validator: (file: File) => {
    if (!(file instanceof File)) return true;
    return validateFileSize({ file, size, units });
  },
  message,
});

const imageMimeType = ({ message }: ValidationProps): Validation => {
  return fileMimeType({
    allowedMimeTypes: ["image/jpeg", "image/png"],
    message,
  });
};

export { required, fileRequired, fileMimeType, fileSize, imageMimeType };
