import { createPeakSeasonRateRepo } from "@/repositories/peakRate/createPeakRate.repo";
import { PeakSeasonRate } from "@/types/peakSeosenRate.type";


export const createPeakSeasonRateAction = async (roomId: number, rateData: PeakSeasonRate) => {
    try {
        const rate = await createPeakSeasonRateRepo(roomId, rateData);
        return {
            status: 200,
            message: "Peak season rate created successfully",
            rate,
        };
    } catch (error) {
        throw error;
    }
};