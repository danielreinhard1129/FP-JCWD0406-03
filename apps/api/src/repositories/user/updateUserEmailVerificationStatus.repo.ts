import prisma from "@/prisma";

export const updateUserEmailVerificationStatus = async (userId: number, isVerified: boolean) => {
    try {
        await prisma.user.update({
            where: { id: userId },
            data: { isVerified },
        });
    } catch (error) {
        throw error;
    }
};