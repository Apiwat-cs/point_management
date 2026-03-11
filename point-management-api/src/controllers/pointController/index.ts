import { type Request, type Response } from 'express';
import { addPointJob } from '@/systems/queue/pointQueue';
import { getTransactionList, getTransactionById, getLeaderboard as getLeaderboardService } from '@/services/pointService';
import { type ILeaderboardRow, type ILeaderboardResponse } from '@/types/point';
import { triggerSchema } from '@/schemas/pointSchema';
import z from 'zod';

export const triggerPoint = async (req: Request, res: Response) => {
  try {
    const validatedData = triggerSchema.parse(req.body);
    const job = await addPointJob(validatedData);

    res.status(200).json({
      status: 'success',
      message: 'Activity received and processing',
      payload: {
        jobId: job.id,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        status: 'error',
        message: 'Invalid input',
        errors: error.issues,
      });
      return;
    }
    console.error('Trigger Point Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const search = req.query.search as string;
    const userId = req.query.userId as string;

    const payload = await getTransactionList({ page, pageSize, search, userId });

    res.status(200).json({
      status: 'success',
      message: '',
      payload,
    });
  } catch (error) {
    console.error('Get Transaction List Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

export const getTransactionDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = await getTransactionById(id as string);

    if (!payload) {
      res.status(404).json({
        status: 'error',
        message: 'Transaction not found',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      message: '',
      payload,
    });
  } catch (error) {
    console.error('Get Transaction Detail Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const { type, month, limit, offset } = req.query;

    const p_type = (type as string)?.toUpperCase() || 'OVERALL';
    const p_limit = parseInt(limit as string) || 10;
    const p_offset = parseInt(offset as string) || 0;

    let p_target_date = null;

    if (p_type === 'MONTHLY' && month) {
      p_target_date = `${month}-01`;
    }

    const rows = await getLeaderboardService({
      type: p_type,
      limit: p_limit,
      offset: p_offset,
      targetDate: p_target_date,
    });

    res.json({
      success: true,
      filter: {
        type: p_type,
        month: month || 'current',
      },
      data: rows.map(
        (row: ILeaderboardRow): ILeaderboardResponse => ({
          rank: parseInt(row.rank_number as string),
          userId: row.user_id,
          score: parseFloat(row.score as string), // Convert Numeric to normal number
          lastActive: row.last_active,
        }),
      ),
    });
  } catch (error: any) {
    console.error('Leaderboard Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
