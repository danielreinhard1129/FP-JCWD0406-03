import prisma from "@/prisma";

export const deletePeakSeasonRateRepo = async (id: number) => {
    try {
        const result = await prisma.peakSeasonRate.delete({
            where: {
                id: id,
            },
        });
        return result;
    } catch (error) {
        throw error;
    }
};
