import { hashPassword } from "@/lib/bcrypt";

import { createUser } from "@/repositories/user/createUserRepo";

import { getUserByEmail } from "@/repositories/user/getUserByEmail";

import { IUser } from "@/types/user.type";

export const registerAction = async (body: IUser) => {
  try {
    const { email, password } = body;

    const userEmail = await getUserByEmail(email);

    if (userEmail) {
      return {
        status: 400,
        message: "Email already exist",
      };
    }

    // Hashing password
    const hashedPassword = await hashPassword(password);
    body.password = hashedPassword;

    await createUser(body);

    return {
      status: 200,
      message: "Register success",
    };
  } catch (error) {
    throw error;
  }
};
