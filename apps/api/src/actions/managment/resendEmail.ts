import { transporter } from '@/lib/nodemailer';
import prisma from '@/prisma';
import { transactionGetUuid } from '@/repositories/transaction/transactiongetuuid.repo';
import fs from 'fs';
import Handlebars from 'handlebars';
import scheduler from 'node-schedule';
import path from 'path';

export const resendEmailAction = async (uuid: string) => {
  try {
    const getDataTransasction = await transactionGetUuid(uuid);
    const baseUrl = 'http://localhost:3000';
    const link = baseUrl + `/transaction/${getDataTransasction?.uuid}`;
    const templatePath = path.join(
      __dirname,
      '../../templates',
      'templateResendEmail.hbs',
    );
    const templateSource = await fs.promises.readFile(templatePath, 'utf8');

    const compileTemplate = Handlebars.compile(templateSource);
    const html = compileTemplate({
      name: getDataTransasction?.user.username,
      link,
    });

    await transporter.sendMail({
      from: 'sender',
      to: getDataTransasction?.user.email,
      subject: 'Complete payment',
      html,
    });

    const oneHourFromNow = new Date(Date.now() + 1 * 60 * 60 * 1000);
    const scheduledTask = scheduler.scheduleJob(oneHourFromNow, async () => {
      const result = await prisma.transaction.findUnique({
        where: { uuid: getDataTransasction?.uuid },
      });

      if (result?.statusTransaction === 'EXPIRED') {
        await prisma.transaction.update({
          where: { id: result?.id },
          data: { statusTransaction: 'REJECT' },
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
        await prisma.room.update({
          where: {
            id: result?.roomId,
          },
          data: {
            status: 'AVAILABLE',
          },
        });
        scheduledTask.cancel();

        return;
      } else {
        scheduledTask.cancel();

      }
    });

    return {
      status: 200,
      message: 'successfully send email',
    };
  } catch (error) {
    throw error;
  }
};
