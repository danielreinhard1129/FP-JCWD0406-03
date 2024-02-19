import { hashPassword } from "@/lib/bcrypt";
import { getUserByEmail } from "@/repositories/user/getUserByEmail";
import { updateUser } from "@/repositories/user/updateUser";

interface Data {
  password: string;
  confirmPassword: string;
}

export const resetPasswordAction = async (email: string, data: Data) => {
  try {
    const { password, confirmPassword } = data;

    if (password !== confirmPassword) throw new Error("Password not match");

    const user = await getUserByEmail(email);

    if (!user) throw new Error("Account not found!");

    const hashedPassword = await hashPassword(password);
    await updateUser(email, { password: hashedPassword });

    return {
      message: "Reset Password Success",
    };
  } catch (error) {
    throw error;
  }
};
