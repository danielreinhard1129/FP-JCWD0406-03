import { getAllPeakSeosonRateByOwnerIdRepo } from "@/repositories/peakRate/getAllPeakSeosenRateByOwner.repo";

export const getAllPeakSeosonRateByOwnerIdAction = async (ownerId: number, page: number = 1, pageSize: number = 10) => {
    try {
        const peakSeasonRates = await getAllPeakSeosonRateByOwnerIdRepo(ownerId, page, pageSize);
        return {
            status: 200,
            message: "Peak season rates retrieved successfully",
            peakSeasonRates,
        };
    } catch (error) {
        throw error;
    }
};
