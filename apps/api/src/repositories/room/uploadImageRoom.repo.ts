import prisma from "@/prisma";

export const uploadRoomPictureRepo = async (
    roomId: number,
    imagePath: string
) => {
    try {
        const result = await prisma.roomPicture.create({
            data: {
                image: imagePath,
                room: { connect: { id: roomId } },
            },
        });
        return result;
    } catch (error) {
        throw error;
    }
};
