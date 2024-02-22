import { commnetRepo } from '@/repositories/review/comment.repo';
import { findRoomRepo } from '@/repositories/transaction/findroom.repo';
import { transactionRepo } from '@/repositories/transaction/transaction.repo';
import { updateRoomStatus } from '@/repositories/transaction/updateroom.repo';
import { ITransaction } from '@/types/types';

export const transactionAction = async (data: ITransaction) => {
  try {
    const { roomId, checkIn, checkOut } = data;
    const roomAvaibility = await findRoomRepo(roomId, checkIn, checkOut);

    if (roomAvaibility) {
      return {
        status: 400,
        message: 'The room has been booked',
      };
    }
    const result = await transactionRepo(data);
    await updateRoomStatus(roomId);
    return {
      status: 200,
      message: 'Your transaction success',
      result,
    };
  } catch (error) {
    throw error;
  }
};
