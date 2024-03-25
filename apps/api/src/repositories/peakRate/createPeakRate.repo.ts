import prisma from "@/prisma";
import { PeakSeasonRate } from "@/types/peakSeosenRate.type";

export const createPeakSeasonRateRepo = async (roomId: number, data: PeakSeasonRate) => {
    try {
        const result = await prisma.peakSeasonRate.create({
            data: {
                ...data,
                roomId: roomId,
            },
        });
        return result;
    } catch (error) {
        throw error;
    }
};
