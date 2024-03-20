import prisma from "@/prisma";

export const uploadRoomPictureRepo = async (
    id: number,
    imagePath: string
) => {
    try {
        const result = await prisma.roomPicture.create({
            data: {
                image: imagePath,
                room: { connect: { id: id } },
            },
        });
        return result;
    } catch (error) {
        throw error;
    }
};
