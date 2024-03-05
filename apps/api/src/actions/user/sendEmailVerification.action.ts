import { createToken } from "@/lib/jwt";
import { transporter } from "@/lib/nodemailer";
import { getUserByEmail } from "@/repositories/user/getUserByEmail";
import fs from "fs";
import Handlebars from "handlebars";
import path from "path";

export const sendEmailVerificationUser = async (email: string) => {
  try {
    const user = await getUserByEmail(email);

    if (!user) throw new Error("Account not found");

    const token = createToken({ email: user.email });

    const baseUrl = "http://localhost:3000";
    const verificationLink = baseUrl + `/verify-email?token=${token}`;

    const templatePath = path.join(
      __dirname,
      "../../templates",
      "templateVerifyEmail.hbs"
    );
    const templateSource = await fs.promises.readFile(templatePath, "utf8");

    const compileTemplate = Handlebars.compile(templateSource);
    const html = compileTemplate({ name: user.username, verificationLink });

    await transporter.sendMail({
      from: "sender",
      to: email,
      subject: "Verify your Email",
      html,
    });

    return {
      message: " Send email for verfiy account  success",
      status: 200,
      token,
    };
  } catch (error) {
    throw error;
  }
};
