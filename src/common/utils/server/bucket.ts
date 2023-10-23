import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { config } from "@config";

const client = new S3Client({
  credentials: {
    accessKeyId: config.aws.accessKey,
    secretAccessKey: config.aws.secretAccessKey,
  },
  region: config.aws.region,
});

interface UploadProps {
  filename: string;
  buffer: Buffer;
}

const upload = ({ filename, buffer }: UploadProps) => {
  const command = new PutObjectCommand({
    Bucket: config.aws.bucket.key,
    Key: filename,
    Body: buffer,
  });
  return client.send(command);
};

interface DeleteProps {
  filename: string;
}

const del = ({ filename }: DeleteProps) => {
  const command = new DeleteObjectCommand({
    Bucket: config.aws.bucket.key,
    Key: filename,
  });
  return client.send(command);
};

export const bucket = { upload, del };
