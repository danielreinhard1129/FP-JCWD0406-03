import { userVerification } from "@/repositories/user/verifyEmailUser.repo";

export const userVerificationAction = async (email: string) => {
  try {
    const user = await userVerification(email);
    return {
      user,
      message: "Your account is verified",
    };
  } catch (error) {
    throw error;
  }
};
