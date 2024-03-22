import { getRoomsByOwnerIdRepo } from "@/repositories/room/getRoomByOwnerId.repo";


export const getRoomsByOwnerIdAction = async (ownerId: number, page: number, pageSize: number) => {
    try {
        const rooms = await getRoomsByOwnerIdRepo(ownerId, page, pageSize);
        return {
            status: 200,
            message: "Rooms retrieved successfully",
            rooms,
        };
    } catch (error) {
        throw error;
    }
};
