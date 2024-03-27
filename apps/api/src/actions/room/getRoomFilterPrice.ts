// getAllRoomsActionFilter.ts

import { getAllRoomsRepoFilterWithPagination } from "@/repositories/room/getRoomFilterPrice";
import { Room } from "@prisma/client";

export const getAllRoomsActionFilter = async (
    page: number = 1,
    perPage: number = 10,
    sortBy: 'ASC' | 'DESC' = 'ASC'
): Promise<{ status: number; message: string; rooms: Room[] }> => {
    try {
        const rooms = await getAllRoomsRepoFilterWithPagination(page, perPage, sortBy);
        return {
            status: 200,
            message: "Rooms retrieved successfully",
            rooms,
        };
    } catch (error) {
        throw error;
    }
};
