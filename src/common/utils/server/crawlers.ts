const google = [
  "googlebot",
  "storebot-google",
  "google-inspectiontool",
  "googleother",
];

const googleIps = ["66.249.73.224"];

const bing = ["bingbot", "adidxbot", "bingpreview", "microsoftpreview"];

const crawlers = [...google, ...bing];

const isCrawlerUA = (userAgent?: string | null) => {
  if (!userAgent) return false;
  return crawlers.find((crawler) => userAgent.toLowerCase().includes(crawler));
};

const isCrawlerIP = (ip?: string | null) => {
  if (!ip) return false;
  const googleIp = googleIps.find((googleIp) => ip === googleIp);
  if (googleIp) return `${ip}(google)`;
  return false;
};

export { isCrawlerUA, isCrawlerIP };
