import prisma from '@/prisma';

export const cancelOrderRepo = async (uuid: string) => {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: {
        uuid: uuid,
      },
      include: {
        room: true, // Ini akan memuat data kamar terkait dengan transaksi
      },
    });
    const updateTransaction = await prisma.transaction.update({
      where: {
        uuid: uuid,
      },
      data: {
        statusTransaction: 'CANCEL',
      },
    });

    // Perbarui status kamar menjadi 'AVAILABLE'
    const updatedRoom = await prisma.room.update({
      where: {
        id: transaction?.room.id,
      },
      data: {
        status: 'AVAILABLE',
      },
    });
    return {
      transaction: updateTransaction,
      room: updatedRoom,
    };
  } catch (error) {
    throw error;
  }
};
