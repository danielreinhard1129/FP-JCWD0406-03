import { commnetRepo } from '@/repositories/review/comment.repo';

export const commentAction = async (
  riviewId: number,
  tenantId: number,
  usernameTenant: string,
  reply: string,
) => {
  try {
    const result = await commnetRepo(riviewId, tenantId, usernameTenant, reply);
    return {
      status: 200,
      message: 'Add Comment Success',
      result,
    };
  } catch (error) {
    throw error;
  }
};
