import { cancelOrderRepo } from '@/repositories/transaction/cancelOrder.repo';
import { findRoomRepo } from '@/repositories/transaction/findroom.repo';

export const findRoomReservation = async (
  roomId: number,
  checkIn: Date,
  checkOut: Date,
) => {
  try {
    const data = await findRoomRepo(roomId, checkIn, checkOut);
    if (data) {
      return {
        status: 400,
        message: 'Room has been booked',
        data,
      };
    }

    return {
      status: 200,
      message: 'Letsgo trip',
      data,
    };
  } catch (error) {
    throw error;
  }
};
