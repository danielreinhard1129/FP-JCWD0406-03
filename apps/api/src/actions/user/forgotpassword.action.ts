import { createToken } from "@/lib/jwt";
import { transporter } from "@/lib/nodemailer";
import { getUserByEmail } from "@/repositories/user/getUserByEmail";

export const forgotPasswordAction = async (email: string) => {
  try {
    const user = await getUserByEmail(email);

    if (!user) throw new Error("Account not found");

    const token = createToken({ email: user.email });

    const baseUrl = "http://localhost:3000";
    const link = baseUrl + `/reset-password?token=${token}`;

    await transporter.sendMail({
      from: "sender",
      to: email,
      subject: "Reset Password Link",
      html: `<a href="${link}" target="_blank">Reset Password Here</a>`,
    });

    return {
      message: "Send Email success",
      status: 200,
    };
  } catch (error) {
    throw error;
  }
};
