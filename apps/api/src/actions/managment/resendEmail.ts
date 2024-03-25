import { successRepo } from '@/repositories/management/success.repo';
import fs from 'fs';
import scheduler from 'node-schedule';
import { transporter } from '@/lib/nodemailer';
import Handlebars from 'handlebars';
import path from 'path';
import { transactionGetUuid } from '@/repositories/transaction/transactiongetuuid.repo';
import prisma from '@/prisma';
import { getUserByEmail } from '@/repositories/user/getUserByEmail';

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
        console.log(
          'Transaction Expired We automaticly cancel your transaction',
        );
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
        console.log('Cancel Order');
        return;
      } else {
        scheduledTask.cancel();
        console.log(
          'Scheduled task has been cancelled because payment proof is uploaded.',
        );
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
