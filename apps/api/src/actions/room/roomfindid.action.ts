import { findRoomIdRepo } from '@/repositories/room/roomfindid.repo';

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
