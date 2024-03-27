import { nanoid } from '@/lib/nanoid';

import { ITransaction } from '@/types/types';
import scheduler from 'node-schedule';
import { transporter } from '@/lib/nodemailer';
import fs from 'fs';
import Handlebars from 'handlebars';
import path from 'path';
import { getUserById } from '@/repositories/user/getUserByIdRepo';
import prisma from '@/prisma';
export const createTransaction = async (body: ITransaction) => {
  try {
    const { roomId, userId, checkIn, checkOut, total, uuid, card_number } =
      body;

    const userEmail = await getUserById(userId);

    const orderId = `RMH-${nanoid(4)}-${nanoid(3)}`;

    const createTransaction = await prisma.transaction.create({
      data: {
        roomId,
        orderId,
        userId,
        checkIn,
        checkOut,
        card_number,
        total,
        statusTransaction: 'PENDING',
      },
      include: {
        user: true,
      },
    });

    const user = userEmail?.email;
    const baseUrl = 'http://localhost:3000';
    const link = baseUrl + `/transaction/${createTransaction?.uuid}`;
    const templatePath = path.join(
      __dirname,
      '../../templates',
      'templateTransaction.hbs',
    );
    const templateSource = await fs.promises.readFile(templatePath, 'utf8');

    const compileTemplate = Handlebars.compile(templateSource);
    const html = compileTemplate({
      name: userEmail?.username,
      link,
    });

    await transporter.sendMail({
      from: 'sender',
      to: user,
      subject: 'Complete payment',
      html,
    });

    const oneHourFromNow = new Date(Date.now() + 1 * 60 * 60 * 1000);
    const scheduledTask = scheduler.scheduleJob(oneHourFromNow, async () => {
      const result = await prisma.transaction.findUnique({
        where: { id: createTransaction.id },
      });

      if (result?.statusTransaction === 'PENDING') {
        await prisma.transaction.update({
          where: { id: result?.id },
          data: { statusTransaction: 'EXPIRED' },
        });

        await prisma.room.update({
          where: {
            id: result?.roomId,
          },
          data: {
            status: 'AVAILABLE',
          },
        });

      } else if (result?.statusTransaction === 'CANCEL') {
        scheduledTask.cancel();

        return;
      } else {
        scheduledTask.cancel();

      }
    });

    return {
      status: 200,
      message: 'Your transaction succes',
      createTransaction,
    };
  } catch (error) {
    throw error;
  }
};
