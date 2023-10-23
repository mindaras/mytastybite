import { mailer } from "@common/utils/server/mailer";
import { initRateLimit } from "@common/utils/server/rateLimit";
import { config } from "@config";
import { NextRequest, NextResponse } from "next/server";
import { ContactFormData } from "src/app/[lang]/contact/(components)/ContactForm";

export async function POST(request: NextRequest) {
  const { rateLimit, rateLimitError } = initRateLimit();
  const { allow } = await rateLimit();
  if (!allow) return rateLimitError();

  const { email, message }: ContactFormData = await request.json();

  try {
    await mailer.send({
      to: config.mailer.recipient,
      subject: `Email from: ${email}`,
      text: message,
    });

    return new NextResponse(null, { status: 200 });
  } catch (err) {
    return new NextResponse(null, { status: 500 });
  }
}
