import { generateBuffer } from "./file";
import { randomUUID } from "crypto";
import { readFile, writeFile, rm } from "fs/promises";
import fs from "fs";
import path from "path";
import jimp from "jimp";

interface CompressionProps {
  buffer: Buffer;
  quality?: number;
}

const TMP_PATH = path.join(__dirname, "tmp");

/*
  sharp library leaks memory on Linux or the freed up memory doesn't get returned to the OS
  larger instance might resolve this issue since it works fine with smaller files
*/

// const compressImage = async ({ buffer, options }: CompressionProps) => {
// const filePath = path.join(TMP_PATH, `${randomUUID()}.jpg`);

// if (!fs.existsSync(TMP_PATH)) fs.mkdirSync(TMP_PATH);

//   await sharp(buffer).jpeg(options).toFile(filePath);
//   const compressedBuffer = await readFile(filePath);
//   rm(filePath);
//   return compressedBuffer;
// };

// const compressPreviewImage = async ({ buffer }: CompressionProps) => {
//   return compressImage({ buffer, options: { quality: 1 } });
// };

const compressImage = async ({ buffer, quality = 50 }: CompressionProps) => {
  const filePath = path.join(TMP_PATH, `${randomUUID()}.jpg`);
  if (!fs.existsSync(TMP_PATH)) fs.mkdirSync(TMP_PATH);
  await writeFile(filePath, buffer);
  const image = await jimp.read(filePath);
  image.resize(800, jimp.AUTO);
  image.quality(quality);
  await image.writeAsync(filePath);
  const imageBuffer = await readFile(filePath);
  rm(filePath);
  return imageBuffer;
};

const compressPreviewImage = async ({ buffer }: CompressionProps) => {
  return compressImage({ buffer, quality: 1 });
};

const generateCompressedAndPreviewBuffers = async (file: File) => {
  const buffer = await generateBuffer(file);
  const [imageBuffer, previewBuffer] = await Promise.all([
    compressImage({ buffer }),
    compressPreviewImage({ buffer }),
  ]);
  return { imageBuffer, previewBuffer };
};

export {
  compressImage,
  compressPreviewImage,
  generateCompressedAndPreviewBuffers,
};
