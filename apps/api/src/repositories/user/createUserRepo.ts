import prisma from '@/prisma';
import { IUser } from '@/types/user.type';

export const createUser = async (data: IUser) => {
  try {
    const { username, password, email, contact, alamat, roleId, identityNumber } = data;
    const result = await prisma.user.create({
      data: {
        username,
        password,
        email,
        contact,
        alamat,
        roleId,
        identityNumber,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
