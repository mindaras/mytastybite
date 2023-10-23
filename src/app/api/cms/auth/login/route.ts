import { LoginFormData } from "@common/components/auth/cms/LoginForm";
import {
  checkPassword,
  generateAndPersistTokens,
  hashPassword,
} from "@common/utils/server/auth";
import { initRateLimit } from "@common/utils/server/rateLimit";
import { config } from "@config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { rateLimit, rateLimitError } = initRateLimit();
  const { allow } = await rateLimit();
  if (!allow) return rateLimitError();

  const { username, password }: LoginFormData = await request.json();

  if (!username || !password) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  }

  const { admin } = config.auth.credentials;

  if (username !== admin.username) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }

  try {
    const hashedAdminPassword = await hashPassword(admin.password);
    const isPasswordValid = await checkPassword(password, hashedAdminPassword);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 }
      );
    }

    await generateAndPersistTokens({
      payload: { user: { id: username } },
      withRefreshToken: true,
    });
    return NextResponse.json({ data: { success: true } });
  } catch (err) {
    return new NextResponse(null, { status: 500 });
  }
}
