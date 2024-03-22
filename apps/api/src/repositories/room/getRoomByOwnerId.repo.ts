import prisma from "@/prisma";

export const getRoomsByOwnerIdRepo = async (ownerId: number, page: number, pageSize: number) => {
    try {
        const skip = (page - 1) * pageSize;
        const rooms = await prisma.room.findMany({
            where: {
                property: {
                    ownerId: ownerId,
                },
            },
            include: {
                property: {
                    include: {
                        images: true,
                    },
                },
                transaction: true,
                images: true,
            },
            skip,
            take: pageSize
        });
        return rooms;
    } catch (error) {
        throw error;
    }
};
