import { redisClient } from "../config/redis";
import { env } from "../config/env";

const DEFAULT_TTL = env.REDIS_TTL_SECONDS;

export const cacheKeys = {
  allTasks: "todo:tasks:all",
};

export async function getCache<T>(key: string): Promise<T | null> {
  try {
    const data = await redisClient.get(key);
    if (!data) return null;
    return JSON.parse(data) as T;
  } catch (error) {
    console.error(`Cache get error for key ${key}:`, error);
    return null;
  }
}

export async function setCache<T>(
  key: string,
  value: T,
  ttlSeconds = DEFAULT_TTL,
): Promise<void> {
  try {
    await redisClient.set(key, JSON.stringify(value), { EX: ttlSeconds });
  } catch (error) {
    console.error(`Cache set error for key ${key}:`, error);
  }
}

export async function deleteCache(key: string): Promise<void> {
  try {
    await redisClient.del(key);
  } catch (error) {
    console.error(`Cache delete error for key ${key}:`, error);
  }
}
