import "client-only";
import { createApi } from "./api";
import { config } from "@config";

const api = createApi({ baseUrl: config.origin });

export { api };
