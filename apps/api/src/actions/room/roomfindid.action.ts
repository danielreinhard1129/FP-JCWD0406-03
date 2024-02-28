import { hashPassword } from '@/lib/bcrypt';
import { findRoomIdRepo } from '@/repositories/room/roomfindid.repo';
import { getUserByEmail } from '@/repositories/user/getUserByEmail';
import { updateUser } from '@/repositories/user/updateUser';

export const findRoomIdAction = async (roomId: number) => {
  try {
    const data = await findRoomIdRepo(roomId);
    return {
      status: 200,
      message: 'Succes get room',
      data,
    };
  } catch (error) {
    throw error;
  }
};
