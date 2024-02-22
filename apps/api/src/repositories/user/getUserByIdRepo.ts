import prisma from "@/prisma";

export const getUserById = async (userId: number) => {
  try {
    const result = await prisma.user.findUnique({
      where: { id: userId }, // Mencari user berdasarkan ID
    });
    return result;
  } catch (error) {
    throw error;
  }
};
