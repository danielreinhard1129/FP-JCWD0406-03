import prisma from '@/prisma';

export const getUserByEmail = async (email: string) => {
  try {
    const result = await prisma.user.findUnique({
      where: { email },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
