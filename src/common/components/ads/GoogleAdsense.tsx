import { config } from "@config";
import Script from "next/script";

const GoogleAdsense = () => {
  if (config.env !== "production" || !config.ads.adsenseId) return null;

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${config.ads.adsenseId}`}
      crossOrigin="anonymous"
    />
  );
};

export { GoogleAdsense };
