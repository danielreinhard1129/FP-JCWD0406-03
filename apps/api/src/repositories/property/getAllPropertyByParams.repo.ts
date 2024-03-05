// property.repository.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPropertyByLocationRepo = async (
    location: string,
    startDate: string,
    endDate: string,
    guest: number
) => {
    try {
        const properties = await prisma.property.findMany({
            where: {
                AND: [
                    { location: { equals: location } },
                    { availableStartDate: { lte: startDate } },
                    { availableEndDate: { gte: endDate } },
                    { maxGuest: { gte: guest } }
                ]
            },
            include: {
                Room: true,
                images: true,
            },
        });
        return properties;
    } catch (error) {
        throw new Error("Failed to get properties by location");
    }
};
