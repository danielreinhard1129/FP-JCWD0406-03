import prisma from "@/prisma";
import { IUser } from "@/types/user.type";

export const createUser = async (data: IUser) => {
  try {
    const { username, password, email, contact, alamat, roleId } = data;
    const result = await prisma.user.create({
      data: {
        username,
        password,
        email,
        contact,
        alamat,
        roleId,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
