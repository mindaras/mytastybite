import { FileSizeUnits, validateSize } from "../file";

const generateBuffer = async (file: File) => {
  const bytes = await file.arrayBuffer();
  return Buffer.from(bytes);
};

interface ValidateBufferSizeProps {
  buffer: Buffer;
  size: number;
  units: FileSizeUnits;
}

const validateBufferSize = ({
  buffer,
  size,
  units,
}: ValidateBufferSizeProps) => {
  return validateSize({ bytes: buffer.byteLength, size, units });
};

export { generateBuffer, validateBufferSize };
