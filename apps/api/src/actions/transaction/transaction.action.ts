import { findRoomRepo } from '@/repositories/transaction/findroom.repo';
import { transactionRepo } from '@/repositories/transaction/transaction.repo';
import { updateRoomStatus } from '@/repositories/transaction/updateroom.repo';
import { ITransaction } from '@/types/types';
import { transporter } from '@/lib/nodemailer';
import fs from 'fs';
import Handlebars from 'handlebars';
import path from 'path';

export const transactionAction = async (data: ITransaction) => {
  try {
    const { roomId, checkIn, checkOut, uuid } = data;
    const roomAvaibility = await findRoomRepo(roomId, checkIn, checkOut);

    if (roomAvaibility) {
      return {
        status: 400,
        message: 'The room has been booked',
      };
    }

    const result = await transactionRepo(data);
    const user = result.user.email;

    const baseUrl = 'http://localhost:3000';
    const link = baseUrl + `/transaction/${result.uuid}`;
    const templatePath = path.join(
      __dirname,
      '../../templates',
      'templateTransaction.hbs',
    );
    const templateSource = await fs.promises.readFile(templatePath, 'utf8');

    const compileTemplate = Handlebars.compile(templateSource);
    const html = compileTemplate({ name: result.user.username, link });

    await transporter.sendMail({
      from: 'sender',
      to: user,
      subject: 'Complete payment',
      html,
    });

    await updateRoomStatus(roomId);
    return {
      status: 200,
      message: 'Your transaction success',
      result,
    };
  } catch (error) {
    throw error;
  }
};
