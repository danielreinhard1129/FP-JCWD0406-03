import { excludeFields } from '@/helper/excludeFields';
import { comparePasswords } from '@/lib/bcrypt';
import { createToken } from '@/lib/jwt';
import { getUserByEmail } from '@/repositories/user/getUserByEmail';
import { IUser } from '@/types/user.type';

export const loginAction = async (data: IUser) => {
  try {
    const { email, password } = data;

    const user = await getUserByEmail(email);

    if (!user) throw new Error('Account not found!');

    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid) throw new Error('Invalid Password');

    const dataWithoutPassword = excludeFields(user, ['password']);

    const token = createToken({ email: user.email });

    return {
      message: 'Login success',
      data: dataWithoutPassword,
      token,
    };
  } catch (error) {
    throw error;
  }
};
