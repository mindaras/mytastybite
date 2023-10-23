"use client";

import { useEffect } from "react";

const HangingLoaderObserver = () => {
  const reloadIfHanged = () => {
    if (document.getElementById("loader")) window.location.reload();
  };

  useEffect(() => {
    const oldPushState = history.pushState;
    history.pushState = function pushState() {
      const original = oldPushState.apply(this, arguments as any);
      window.dispatchEvent(new Event("pushstate"));
      window.dispatchEvent(new Event("locationchange"));
      return original;
    };

    const oldReplaceState = history.replaceState;
    history.replaceState = function replaceState() {
      const original = oldReplaceState.apply(this, arguments as any);
      window.dispatchEvent(new Event("replacestate"));
      window.dispatchEvent(new Event("locationchange"));
      return original;
    };

    window.addEventListener("popstate", () => {
      window.dispatchEvent(new Event("locationchange"));
    });

    window.addEventListener("locationchange", () => {
      setTimeout(reloadIfHanged, 3000);
    });
  }, []);

  return null;
};

export { HangingLoaderObserver };
