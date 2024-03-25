import { successRepo } from '@/repositories/management/success.repo';
import fs from 'fs';
import scheduler from 'node-schedule';
import { transporter } from '@/lib/nodemailer';
import Handlebars from 'handlebars';
import path from 'path';
import { transactionGetUuid } from '@/repositories/transaction/transactiongetuuid.repo';
import prisma from '@/prisma';
export const successAction = async (
  uuid: string,
  userEmail: string,

  checkOut: Date,
) => {
  try {
    const getDataTransaction = await transactionGetUuid(uuid);
    const user = userEmail;
    const templatePath = path.join(
      __dirname,
      '../../templates',
      'templateInvoice.hbs',
    );
    const templateSource = await fs.promises.readFile(templatePath, 'utf8');
    const createdAt = getDataTransaction?.createdAt
      ? new Date(getDataTransaction.createdAt)
      : null; // Menggunakan tanggal yang Anda berikan

    let formattedCreatedAt = '';

    if (getDataTransaction && createdAt) {
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      formattedCreatedAt = `${
        months[createdAt.getMonth()]
      } ${createdAt.getDate()}, ${createdAt.getFullYear()}`;
    } else {
      formattedCreatedAt = 'Invalid Date';
    }

    const compileTemplate = Handlebars.compile(templateSource);
    const html = compileTemplate({
      name: userEmail,
      order_id: getDataTransaction?.orderId,
      created_at: formattedCreatedAt,
      total: getDataTransaction?.total,
    });

    await transporter.sendMail({
      from: 'sender',
      to: user,
      subject: 'We accepted your order',
      html,
    });

    const oneHourFromNow = new Date(checkOut);
    scheduler.scheduleJob(oneHourFromNow, async () => {
      await prisma.room.update({
        where: { id: getDataTransaction?.roomId },
        data: { status: 'AVAILABLE' },
      });
      const templatePath = path.join(
        __dirname,
        '../../templates',
        'templateCheckout.hbs',
      );
      const templateSource = await fs.promises.readFile(templatePath, 'utf8');
      const compileTemplate = Handlebars.compile(templateSource);
      const html = compileTemplate({
        name: userEmail,
        order_id: getDataTransaction?.orderId,
        created_at: formattedCreatedAt,
        total: getDataTransaction?.total,
      });

      await transporter.sendMail({
        from: 'sender',
        subject: 'Checkout room!!',
        to: user,
        html,
      });
    });
    const data = await successRepo(uuid);
    return {
      status: 200,
      message: 'successfully update data',
      data,
    };
  } catch (error) {
    throw error;
  }
};
