import prisma from '@/prisma';
export const commnetRepo = async (
  riviewId: number,
  tenantId: number,
  usernameTenant: string,
  reply: string,
  image: string,
) => {
  try {
    const result = await prisma.comment.create({
      data: { riviewId, tenantId, usernameTenant, reply, image },
    });
    return result;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
