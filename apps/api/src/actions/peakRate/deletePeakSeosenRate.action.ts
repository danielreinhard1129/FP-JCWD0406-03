import { deletePeakSeasonRateRepo } from "@/repositories/peakRate/deletePeakRate.repo";

export const deletePeakSeasonRateAction = async (id: number) => {
    try {
        const rate = await deletePeakSeasonRateRepo(id);
        return {
            status: 200,
            message: "Peak season rate deleted successfully",
            rate,
        };
    } catch (error) {
        throw error;
    }
};
