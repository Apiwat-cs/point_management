import { Worker } from 'bullmq';
import config from '@/config';
import { processPointActivity } from '@/services/pointService';
import { Redis } from 'ioredis';
import { type IPointJobData } from '@/types/point';

const redisConnection = new Redis({
  host: config.redis.REDIS_URL,
  port: config.redis.REDIS_PORT,
  maxRetriesPerRequest: null,
  family: 4, // Force IPv4
});

export const initPointWorker = () => {
  const worker = new Worker<IPointJobData>(
    'point-queue',
    async (job) => {
      console.log(`[PointWorker] Processing job ${job.id}`);
      console.log('[PointWorker] Job name:', job.name);
      try {
        await processPointActivity(job.data);
        console.log(`[PointWorker] Job ${job.id} completed`);
      } catch (error) {
        console.error(`[PointWorker] Job ${job.id} failed:`, error);
        throw error;
      }
    },
    {
      connection: redisConnection,
    },
  );

  worker.on('error', (err) => {
    console.error('[PointWorker] Worker error:', err);
  });

  console.log('[PointWorker] Worker initialized');
};
