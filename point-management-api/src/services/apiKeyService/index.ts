import { query } from '@/databases/postgres';

export const getApiKeyList = async (page: number, pageSize: number, search: string) => {
  try {
    const { rows } = await query('SELECT * FROM sp_get_api_key_list($1, $2, $3)', [page, pageSize, search]);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getApiKeyById = async (id: number) => {
  try {
    const { rows } = await query('SELECT * FROM sp_get_api_key_by_id($1)', [id]);
    return rows[0] || null;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createApiKey = async (input: { systemName: string; environment: string; salt: string; hashedKey: string; expiredAt: string }) => {
  try {
    const { systemName, environment, salt, hashedKey, expiredAt } = input;
    const { rows } = await query('CALL sp_create_api_key($1, $2, $3, $4, $5, NULL)', [systemName, environment, salt, hashedKey, expiredAt]);
    return rows[0]?.p_result || 'Success';
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateApiKey = async (id: number, isActive: boolean) => {
  try {
    const { rows } = await query('CALL sp_update_api_key($1, $2, NULL)', [id, isActive]);
    return rows[0]?.p_result || 'Success';
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteApiKey = async (id: number) => {
  try {
    const { rows } = await query('CALL sp_delete_api_key($1, NULL)', [id]);
    return rows[0]?.p_result || 'Success';
  } catch (error) {
    console.error(error);
    throw error;
  }
};
