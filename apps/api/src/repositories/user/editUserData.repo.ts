import prisma from "@/prisma";
import { IUser } from "@/types/user.type";

export const updateUserData = async (userId: number, data: Partial<IUser>) => {
    try {
        const result = await prisma.user.update({
            where: { id: userId },
            data,
        });
        return result;
    } catch (error) {
        throw error;
    }
};
