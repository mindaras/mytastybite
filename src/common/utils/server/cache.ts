import { config } from "@config";
import { createClient, RedisClientType } from "redis";

const cache = global as unknown as {
  redis: RedisClientType | undefined;
};

const redis =
  cache.redis ??
  createClient({
    url: `redis://default:${config.cache.password}@${config.cache.host}:${config.cache.port}`,
  });

// Node.js cache is cleared on hot reload, this prevents new instance creation
if (process.env.NODE_ENV !== "production") cache.redis = redis;

redis.on("error", (err) => console.error("Redis Client Error", err));

const getCacheClient = async () => {
  if (!redis.isOpen) await redis.connect();
  return redis;
};

export { getCacheClient };
