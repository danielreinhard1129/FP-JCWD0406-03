
import prisma from "@/prisma";
import { RoomStatus, RoomType } from "@/types/room.type";

export const getRoomsByOwnerIdRepo = async (
    ownerId: number,
    page: number,
    pageSize: number,
    type?: RoomType,
    status?: RoomStatus
) => {
    try {
        const skip = (page - 1) * pageSize;
        const whereCondition: any = {
            property: {
                ownerId: ownerId,
            },
        };

        if (type) {
            whereCondition.type = type;
        }

        if (status) {
            whereCondition.status = status;
        }

        const rooms = await prisma.room.findMany({
            where: whereCondition,
            include: {
                property: {
                    include: {
                        images: true,
                    },
                },
                transaction: true,
                images: true,
            },
            skip: skip,
            take: pageSize,
        });
        return rooms;
    } catch (error) {
        throw error;
    }
};
