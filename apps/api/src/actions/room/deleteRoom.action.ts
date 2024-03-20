import { deleteRoomRepo } from "@/repositories/room/deleteRoom.repo";

export const deleteRoomAction = async (id: number) => {
    try {
        const result = await deleteRoomRepo(id);
        return {
            status: 200,
            message: "Room deleted successfully",
            result
        };
    } catch (error) {
        throw error;
    }
};