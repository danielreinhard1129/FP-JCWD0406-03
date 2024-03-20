
import { updateUserData } from "@/repositories/user/editUserData.repo";
import { getUserByEmail } from "@/repositories/user/getUserByEmail";
import { getUserById } from "@/repositories/user/getUserByIdRepo";
import { updateUserEmailVerificationStatus } from "@/repositories/user/updateUserEmailVerificationStatus.repo";
import { IUser } from "@/types/user.type";

export const updateAction = async (userId: number, body: Partial<IUser>) => {
    try {
        const user = await getUserById(userId);

        if (!user) {
            return {
                status: 404,
                message: "User not found",
            };
        }

        // Check if the new email already exists in the database
        if (body.email && body.email !== user.email) {
            const existingUser = await getUserByEmail(body.email);
            if (existingUser) {
                return {
                    status: 400,
                    message: "Email already exists in the database. Please choose another email.",
                };
            }


            await updateUserEmailVerificationStatus(userId, false);
        }

        await updateUserData(userId, body);

        return {
            status: 200,
            message: "User data updated successfully",
        };
    } catch (error) {
        throw error;
    }
};
