import { Queue } from 'bullmq';
import { Redis } from 'ioredis';
import config from '@/config';
import { type IPointJobData } from '@/types/point';

const redisConnection = new Redis({
  host: config.redis.REDIS_URL, // strict-config: REDIS_URL holds the host
  port: config.redis.REDIS_PORT,
  maxRetriesPerRequest: null,
  family: 4, // Force IPv4
});

export const pointQueue = new Queue('point-queue', {
  connection: redisConnection,
});

export const addPointJob = async (data: IPointJobData) => {
  return pointQueue.add('process-point', data, {
    removeOnComplete: true,
    removeOnFail: 1000,
  });
};
