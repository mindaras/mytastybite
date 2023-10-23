import { config } from "@config";
import { NextResponse } from "next/server";

const apiMiddleware = () => {
  const response = NextResponse.next();
  response.headers.set("Access-Control-Allow-Origin", config.origin);
  return response;
};

export { apiMiddleware };
