import prisma from '@/prisma';
import { IComment } from '@/types/types';

export const commnetRepo = async (data: IComment) => {
  try {
    const result = await prisma.comment.create({
      data: data,
    });
    return result;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
