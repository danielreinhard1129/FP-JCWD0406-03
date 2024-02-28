import prisma from '@/prisma';
import { ITransaction } from '@/types/types';

export const transactionRepo = async (data: ITransaction) => {
  try {
    const {
      roomId,
      userId,
      paymentMethod,
      checkIn,
      checkOut,
      total,
      paymentProof,
      choosePayment,
    } = data;
    const result = await prisma.transaction.create({
      data: {
        roomId,
        userId,
        paymentMethod,
        checkIn,
        checkOut,
        choosePayment,
        total,
        statusTransaction: 'PENDING',
        paymentProof,
      },
      include: {
        user: true,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
