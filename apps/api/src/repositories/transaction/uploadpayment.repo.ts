import prisma from '@/prisma';

export const uploadPaymentRepo = async (uuid: string, file: string) => {
  try {
    const result = await prisma.transaction.update({
      where: {
        uuid: uuid,
      },
      data: { paymentProof: file, statusTransaction: 'PROCESS' },
    });

    return result;
  } catch (error) {
    throw error;
  }
};
