import { authenticate } from "@common/utils/server/auth";
import { getPathname } from "@common/utils/server/path";
import { redirect } from "next/navigation";

interface Props {
  loginRoute: string;
  refreshRoute: string;
  children: React.ReactNode;
}

/* @ts-expect-error Async Server Component */
const AuthGuard: React.FC<Props> = async ({
  loginRoute,
  refreshRoute,
  children,
}) => {
  const path = getPathname();

  if (path === loginRoute) return children;

  const data = await authenticate();

  if (data?.shouldRefresh) {
    redirect(`${refreshRoute}?redirectPath=${path}&loginPath=${loginRoute}`);
  } else if (!data?.user) redirect(loginRoute);

  return children;
};

export { AuthGuard };
