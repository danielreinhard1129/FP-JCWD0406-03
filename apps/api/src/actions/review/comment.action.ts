import { commnetRepo } from '@/repository/review/comment.repo';

import { IComment } from '@/types/types';

export const commentAction = async (data: IComment) => {
  try {
    const result = await commnetRepo(data);
    return {
      status: 200,
      message: 'Add Comment Success',
      result,
    };
  } catch (error) {
    throw error;
  }
};
