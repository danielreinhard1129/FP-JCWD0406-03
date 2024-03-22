import { hashPassword } from '@/lib/bcrypt';

import { createUser } from '@/repositories/user/createUserRepo';

import { getUserByEmail } from '@/repositories/user/getUserByEmail';

import { IUser } from '@/types/user.type';

export const registerAction = async (body: IUser) => {
  try {
    const { email, password, roleId, identityNumber } = body;

    const userEmail = await getUserByEmail(email);

    if (userEmail) {
      return {
        status: 400,
        message: 'Email already exist',
      };
    }


    const hashedPassword = await hashPassword(password);
    body.password = hashedPassword;

    if (roleId === 1 && !identityNumber) {
      return {
        status: 400,
        message: 'Identity number is required for admin registration',
      };
    }
    if (roleId === 2 && identityNumber) {
      return {
        status: 400,
        message: 'Identity number should not be provided for regular user registration',
      };
    }

    await createUser(body);

    return {
      status: 200,
      message: 'Register success',
    };
  } catch (error) {
    throw error;
  }
};

