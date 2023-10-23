import { config } from "@config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies as getCookies, headers as getHeaders } from "next/headers";
import { NextResponse } from "next/server";
import { getCacheClient } from "./cache";

const hashPassword = (password: string) => {
  return bcrypt.hash(password, config.auth.saltRounds);
};

const checkPassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export interface TokenUser {
  id: string;
}

export interface TokenPayload {
  user: TokenUser;
}

interface GenerateTokenProps {
  payload: TokenPayload;
  type?: "access" | "refresh";
}

const generateToken = ({ payload, type = "access" }: GenerateTokenProps) => {
  const expiresIn = type === "access" ? "3600s" /* 1 hour */ : `${3600 * 48}s`;
  return jwt.sign(payload, config.auth.tokenSecret, { expiresIn });
};

export interface JwtPayload extends TokenPayload {
  iat: number;
  exp: number;
}

interface GenerateAndPersistTokensProps {
  payload: TokenPayload;
  withRefreshToken: boolean;
}

const generateAndPersistTokens = async ({
  payload,
  withRefreshToken,
}: GenerateAndPersistTokensProps) => {
  const cookies = getCookies();
  const accessToken = generateToken({ payload });
  cookies.set("accessToken", accessToken);

  if (withRefreshToken) {
    const refreshToken = generateToken({ payload, type: "refresh" });
    const cache = await getCacheClient();
    await cache.set(
      `${config.app.name}:users:${payload.user.id}:refreshToken`,
      refreshToken
    );
    cookies.set("refreshToken", refreshToken);
  }

  return { payload };
};

const verifyToken = (token: string): Promise<JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.auth.tokenSecret, (error, payload) => {
      if (error) reject(error);
      else resolve(payload as JwtPayload);
    });
  });
};

const refreshSession = async () => {
  const cookies = getCookies();
  const refreshToken = cookies.get("refreshToken")?.value;

  if (!refreshToken) return null;

  try {
    const payload = await verifyToken(refreshToken);
    const cache = await getCacheClient();
    const storedRefreshToken = await cache.get(
      `${config.app.name}:users:${payload.user.id}:refreshToken`
    );

    if (refreshToken !== storedRefreshToken) return null;
    const data = await generateAndPersistTokens({
      payload: { user: payload.user },
      withRefreshToken: true,
    });
    return data;
  } catch (err) {
    return null;
  }
};

interface AuthenticateProps {
  handleRefresh?: boolean;
}

interface AuthenticateResponse {
  user?: TokenUser;
  shouldRefresh?: boolean;
}

const authenticate = async ({ handleRefresh }: AuthenticateProps = {}): Promise<
  AuthenticateResponse | undefined | null
> => {
  const headers = getHeaders();
  const cookies = getCookies();

  const token =
    headers.get("authorization")?.split(" ")[1] ||
    cookies.get("accessToken")?.value;

  if (!token) return null;

  try {
    const { user } = await verifyToken(token);
    return { user };
  } catch (err: any) {
    if (
      err.name === "TokenExpiredError" &&
      cookies.get("refreshToken")?.value
    ) {
      if (handleRefresh) {
        const data = await refreshSession();
        return data?.payload;
      }

      return { shouldRefresh: true };
    }

    return null;
  }
};

const authenticationError = () => {
  return new NextResponse(null, {
    status: 401,
    statusText: "Unauthorized",
  });
};

export {
  hashPassword,
  checkPassword,
  generateAndPersistTokens,
  refreshSession,
  authenticate,
  authenticationError,
};
