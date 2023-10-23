const toMb = (bytes: number) => {
  return bytes / 1000000;
};

const toKb = (bytes: number) => {
  return bytes / 1000;
};

export type FileSizeUnits = "mb" | "kb" | "b";

interface ValidateSizeProps {
  bytes: number;
  size: number;
  units: FileSizeUnits;
}

const validateSize = ({ bytes, size, units }: ValidateSizeProps) => {
  switch (units) {
    case "mb":
      return toMb(bytes) <= size;
    case "kb":
      return toKb(bytes) <= size;
    default:
      return bytes <= size;
  }
};

interface ValidateFileSizeProps {
  file: File;
  size: number;
  units: FileSizeUnits;
}

const validateFileSize = ({ file, size, units }: ValidateFileSizeProps) => {
  return validateSize({ bytes: file.size, size, units });
};

export { toMb, toKb, validateSize, validateFileSize };
