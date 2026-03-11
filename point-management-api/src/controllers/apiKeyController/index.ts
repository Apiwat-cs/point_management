import { generateAdvancedApiKey, parseNumber } from '@/utility';
import type { Request, Response, NextFunction } from 'express';
import * as apiKeyService from '@/services/apiKeyService';
import config from '@/config';

export const getApiKeyList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseNumber(req.query.page as string) || 1;
    const pageSize = parseNumber(req.query.pageSize as string) || 10;
    const search = (req.query.search as string) || '';

    const payload = await apiKeyService.getApiKeyList(page, pageSize, search);
    res.status(200).json({ status: 'success', message: '', payload });
  } catch (error) {
    next(error);
  }
};

export const getApiKeyById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseNumber(req.params.id as string);
    if (!id) {
      res.status(400).json({ status: 'error', message: 'Invalid ID' });
      return;
    }

    const payload = await apiKeyService.getApiKeyById(id);
    if (!payload) {
      res.status(404).json({ status: 'error', message: 'API Key not found' });
      return;
    }
    res.status(200).json({ status: 'success', message: '', payload });
  } catch (error) {
    next(error);
  }
};

export const createApiKey = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { systemName, environment, expiredAt } = req.body;

    if (!systemName || !environment || !expiredAt) {
      res.status(400).json({ status: 'error', message: 'Missing required fields' });
      return;
    }

    const { fullKey, salt, signature } = generateAdvancedApiKey({ systemName, environment });

    const result = await apiKeyService.createApiKey({
      systemName,
      environment,
      salt,
      hashedKey: signature,
      expiredAt,
    });

    if (result.startsWith('Error:')) {
      res.status(400).json({ status: 'error', message: result });
      return;
    }

    res.status(201).json({
      status: 'success',
      message: 'API Key created successfully',
      payload: {
        fullKey,
        secretKey: config.server.API_KEY_SECRET,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateApiKey = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseNumber(req.params.id as string);
    const { isActive } = req.body;

    if (!id || typeof isActive !== 'boolean') {
      res.status(400).json({ status: 'error', message: 'Invalid input' });
      return;
    }

    const result = await apiKeyService.updateApiKey(id, isActive);

    if (result.startsWith('Error:')) {
      res.status(400).json({ status: 'error', message: result });
      return;
    }

    res.status(200).json({ status: 'success', message: 'Status updated successfully' });
  } catch (error) {
    next(error);
  }
};

export const deleteApiKey = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseNumber(req.params.id as string);

    if (!id) {
      res.status(400).json({ status: 'error', message: 'Invalid ID' });
      return;
    }

    const result = await apiKeyService.deleteApiKey(id);

    if (result.startsWith('Error:')) {
      res.status(400).json({ status: 'error', message: result });
      return;
    }

    res.status(200).json({ status: 'success', message: 'API Key deleted successfully' });
  } catch (error) {
    next(error);
  }
};
