declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
      NEXT_RUNTIME: "nodejs" | "edge";
      TZ: string | undefined;
      NEXT_PUBLIC_ORIGIN: string;
      NEXT_PUBLIC_IMAGES_ORIGIN: string;
      CACHE_HOST: string;
      CACHE_PORT: string;
      CACHE_PASSWORD: string;
      TOKEN_SECRET: string;
      ADMIN_USERNAME: string;
      ADMIN_PASSWORD: string;
      TRACING_URL: string;
      API_URL: string;
      MAILER_USERNAME: string;
      MAILER_PASSWORD: string;
      MAILER_RECIPIENT: string;
      GTAG_ID: string;
      ADSENSE_ID: string;
      AWS_ACCESS_KEY: string;
      AWS_SECRET_ACCESS_KEY: string;
      AWS_REGION: string;
      AWS_BUCKET_KEY: string;
    }
  }
}

export {};
