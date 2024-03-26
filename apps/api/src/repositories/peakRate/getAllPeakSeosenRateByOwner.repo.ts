import prisma from "@/prisma";

export const getAllPeakSeosonRateByOwnerIdRepo = async (ownerId: number, page: number = 1, pageSize: number = 10) => {
    try {
        const skip = (page - 1) * pageSize;
        const peakSeasonRates = await prisma.peakSeasonRate.findMany({
            where: {
                Room: {
                    property: {
                        ownerId: ownerId,
                    },
                },
            },
            include: {
                Room: {
                    include: {
                        property: true,
                    },
                },
            },
            skip,
            take: pageSize,
        });
        return peakSeasonRates;
    } catch (error) {
        throw error;
    }
};
