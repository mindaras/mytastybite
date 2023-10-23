import "server-only";
import { createApi } from "./api";
import { config } from "@config";
import { headers } from "next/headers";

const api = createApi({
  baseUrl: config.api.url,
  getDefaultHeaders: () => Object.fromEntries(headers()),
});

export { api };
