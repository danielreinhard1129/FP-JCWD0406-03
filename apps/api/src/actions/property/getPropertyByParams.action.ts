// property.action.ts

import { getPropertyByLocationRepo } from "@/repositories/property/getAllPropertyByParams.repo";
export const getPropertyByLocationAction = async (
    location: string,
    startDate: string,
    endDate: string,
    guest: number
) => {
    try {
        const properties = await getPropertyByLocationRepo(location, startDate, endDate, guest);
        return {
            status: 200,
            message: 'Properties retrieved successfully',
            properties,
        };
    } catch (error) {
        throw error;
    }
};
