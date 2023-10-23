const config = {
  env: process.env.NODE_ENV,
  origin: process.env.NEXT_PUBLIC_ORIGIN,
  app: {
    name: "mytastybite",
  },
  api: {
    url: process.env.API_URL,
  },
  images: {
    origin: process.env.NEXT_PUBLIC_IMAGES_ORIGIN,
  },
  auth: {
    saltRounds: 10,
    tokenSecret: process.env.TOKEN_SECRET,
    credentials: {
      admin: {
        username: process.env.ADMIN_USERNAME,
        password: process.env.ADMIN_PASSWORD,
      },
    },
  },
  cache: {
    host: process.env.CACHE_HOST,
    port: process.env.CACHE_PORT,
    password: process.env.CACHE_PASSWORD,
  },
  mailer: {
    username: process.env.MAILER_USERNAME,
    password: process.env.MAILER_PASSWORD,
    recipient: process.env.MAILER_RECIPIENT,
  },
  tracking: {
    gtagId: process.env.GTAG_ID,
  },
  ads: {
    adsenseId: process.env.ADSENSE_ID,
  },
  aws: {
    accessKey: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    bucket: {
      key: process.env.AWS_BUCKET_KEY,
    },
  },
  i18n: {
    mainLanguage: "en",
  },
};

export { config };
