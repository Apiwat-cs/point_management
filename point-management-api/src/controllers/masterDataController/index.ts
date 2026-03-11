import type { Request, Response, NextFunction } from 'express';
import * as masterDataService from '@/services/masterDataService';
import type { PaginationQuery, ActivityBody, CreatePointRuleBody, UpdatePointRuleBody } from '@/types/masterData';
import { parseBooleanStatus, parseNumber } from '@/utility';

/* ==========================
   Activity Types
   ========================== */

export const getActivities = async (req: Request<Record<string, never>, unknown, unknown, PaginationQuery>, res: Response, next: NextFunction) => {
  try {
    const page = parseNumber(req.query.page) || 1;
    const pageSize = parseNumber(req.query.pageSize) || 10;
    const search = req.query.search || '';

    const payload = await masterDataService.getActivityList({ page, pageSize, search });
    res.status(200).json({ status: 'success', message: '', payload });
  } catch (error) {
    next(error);
  }
};

export const getActivityDetail = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const payload = await masterDataService.getActivityById(id);
    res.status(200).json({ status: 'success', message: '', payload });
  } catch (error) {
    next(error);
  }
};

export const createActivity = async (req: Request<Record<string, never>, unknown, ActivityBody>, res: Response, next: NextFunction) => {
  try {
    await masterDataService.createActivity(req.body);
    res.status(200).json({ status: 'success', message: '', payload: null });
  } catch (error) {
    next(error);
  }
};

export const updateActivity = async (req: Request<{ id: string }, unknown, Partial<ActivityBody>>, res: Response, next: NextFunction) => {
  try {
    const id = parseNumber(req.params.id);

    if (!id) {
      return res.status(400).json({ status: 'failed', message: 'Invalid ID' });
    }

    await masterDataService.updateActivity({
      id,
      ...(req.body as ActivityBody),
    });

    res.status(200).json({ status: 'success', message: 'Update successful', payload: null });
  } catch (error) {
    next(error);
  }
};

export const deleteActivity = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await masterDataService.deleteActivity(id);
    res.status(200).json({ status: 'success', message: '', payload: null });
  } catch (error) {
    next(error);
  }
};

/* ==========================
   Point Rule 
   ========================== */

export const getPointRules = async (req: Request<Record<string, never>, unknown, unknown, PaginationQuery>, res: Response, next: NextFunction) => {
  try {
    const page = parseNumber(req.query.page) || 1;
    const pageSize = parseNumber(req.query.pageSize) || 10;
    const search = req.query.search || '';

    const payload = await masterDataService.getPointRuleList({
      page,
      pageSize,
      search,
    });

    res.status(200).json({ status: 'success', payload });
  } catch (error) {
    next(error);
  }
};

export const getPointRuleDetail = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const ruleId = parseNumber(req.params.id);

    if (!ruleId) {
      return res.status(400).json({
        status: 'failed',
        message: 'Invalid ID',
        payload: null,
      });
    }

    const payload = await masterDataService.getPointRuleById(ruleId);

    if (!payload) {
      return res.status(404).json({
        status: 'failed',
        message: 'Point rule not found',
        payload: null,
      });
    }

    res.status(200).json({ status: 'success', payload });
  } catch (error) {
    next(error);
  }
};

export const createPointRule = async (req: Request<Record<string, never>, unknown, CreatePointRuleBody>, res: Response, next: NextFunction) => {
  try {
    const activityIdRaw = req.body.activityID || req.body.activityId;
    const activityId = parseNumber(activityIdRaw);

    if (!activityId) {
      return res.status(400).json({
        status: 'failed',
        message: 'Missing Activity ID',
      });
    }

    await masterDataService.createPointRule({
      activityId,
      point: parseNumber(req.body.point),
      isActive: parseBooleanStatus(req.body.status),
    });

    res.status(201).json({
      status: 'success',
      message: 'Created successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const updatePointRule = async (req: Request<{ id: string }, unknown, UpdatePointRuleBody>, res: Response, next: NextFunction) => {
  try {
    const paramId = parseNumber(req.params.id);
    const bodyId = parseNumber(req.body.id);
    const id = paramId || bodyId;

    if (!id) {
      return res.status(400).json({ status: 'failed', message: 'Missing Rule ID' });
    }

    await masterDataService.updatePointRule({
      id,
      isActive: parseBooleanStatus(req.body.status),
    });

    res.status(200).json({ status: 'success', message: 'Updated successfully' });
  } catch (error) {
    next(error);
  }
};

export const deletePointRule = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const ruleId = parseNumber(req.params.id);

    if (!ruleId) {
      return res.status(400).json({
        status: 'failed',
        message: 'Invalid ID',
      });
    }

    await masterDataService.deletePointRule(ruleId);

    res.status(200).json({
      status: 'success',
      message: 'Deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
