import prisma from "@/prisma";
import { IUser } from "@/types/user.type";

export const updateUser = async (email: string, data: Partial<IUser>) => {
  try {
    const result = await prisma.user.update({ data, where: { email } });
    return result;
  } catch (error) {
    throw error;
  }
};
