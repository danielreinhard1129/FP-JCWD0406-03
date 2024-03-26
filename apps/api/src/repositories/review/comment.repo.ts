import prisma from '@/prisma';
import { IComment } from '@/types/types';

export const commnetRepo = async (
  riviewId: number,
  tenantId: number,
  usernameTenant: string,
  reply: string,
) => {
  try {
    const result = await prisma.comment.create({
      data: { riviewId, tenantId, usernameTenant, reply },
    });
    return result;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

// model Comment {
//   id        Int      @id @default(autoincrement())
//   riviewId  Int
//   tenantId  Int
//   reply     String
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
//   review    Review   @relation(fields: [riviewId], references: [id])
//   user      User     @relation(fields: [tenantId], references: [id])
// }
