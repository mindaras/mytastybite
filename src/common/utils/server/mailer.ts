import { config } from "@config";
import { Transporter, createTransport } from "nodemailer";

const cache = global as unknown as {
  mailerTransporter: Transporter;
};

const transporter =
  cache.mailerTransporter ??
  createTransport({
    service: "gmail",
    auth: {
      user: config.mailer.username,
      pass: config.mailer.password,
    },
  });

// Node.js cache is cleared on hot reload, this prevents new instance creation
if (process.env.NODE_ENV !== "production") {
  cache.mailerTransporter = transporter;
}

interface SendArgs {
  to: string;
  subject: string;
  text: string;
}

const mailer = {
  send: ({ to, subject, text }: SendArgs) =>
    new Promise((resolve, reject) => {
      transporter.sendMail(
        { from: config.mailer.username, to, subject, text },
        (err, info) => {
          if (err) reject(err);
          else resolve(info.response);
        }
      );
    }),
};

export { mailer };
