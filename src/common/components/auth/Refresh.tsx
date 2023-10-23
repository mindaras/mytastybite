"use client";

import { api } from "@common/utils/api/client";
import { useEffect, useRef } from "react";

interface Props {
  searchParams: {
    redirectPath: string;
    loginPath: string;
  };
}

const Refresh: React.FC<Props> = ({ searchParams }) => {
  const { redirectPath, loginPath } = searchParams;
  if (!redirectPath?.startsWith("/")) window.location.href = "/";
  const ref = useRef<{ isRefreshed: boolean }>({ isRefreshed: false });

  useEffect(() => {
    if (ref.current.isRefreshed) return;

    api.post("/auth/refresh").then((response) => {
      if (!response) {
        if (!loginPath?.startsWith("/")) return (window.location.href = "/");
        else return (window.location.href = loginPath);
      }

      window.location.href = redirectPath;
    });

    ref.current.isRefreshed = true;
  }, []);

  return null;
};

export { Refresh };
