import { getRoomsByOwnerIdRepo } from "@/repositories/room/getRoomByOwnerId.repo";
import { RoomStatus, RoomType } from "@/types/room.type";


export const getRoomsByOwnerIdAction = async (ownerId: number, page: number, pageSize: number, type: RoomType, status: RoomStatus) => {
    try {
        const rooms = await getRoomsByOwnerIdRepo(ownerId, page, pageSize, type, status);
        return {
            status: 200,
            message: "Rooms retrieved successfully",
            rooms,
        };
    } catch (error) {
        throw error;
    }
};
