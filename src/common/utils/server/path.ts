import "server-only";

import { headers } from "next/headers";

const getPathname = () => headers().get("x-path") as string;

const isCMS = () => {
  const path = getPathname();
  return new RegExp("/cms$|/cms/").test(path);
};

const isCMSLogin = () => {
  const path = getPathname();
  return new RegExp("/cms/login$").test(path);
};

export { getPathname, isCMS, isCMSLogin };
