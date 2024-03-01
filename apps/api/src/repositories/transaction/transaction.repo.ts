import prisma from "@/prisma";
import { ITransaction } from "@/types/types";

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
    } = data;
    const result = await prisma.transaction.create({
      data: {
        roomId,
        userId,
        paymentMethod,
        checkIn,
        checkOut,
        total,
        statusTransaction: "PENDING",
        paymentProof,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
