import { config } from "@config";

const GoogleAnalytics = () => {
  if (config.env !== "production" || !config.tracking.gtagId) return null;

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
          <!-- Google tag (gtag.js) -->
          <script async src="https://www.googletagmanager.com/gtag/js?id=${config.tracking.gtagId}"></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', '${config.tracking.gtagId}');
          </script>
        `,
      }}
    ></div>
  );
};

export { GoogleAnalytics };
