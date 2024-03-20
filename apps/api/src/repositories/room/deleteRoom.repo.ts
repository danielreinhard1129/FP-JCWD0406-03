import prisma from "@/prisma";
import fs from 'fs';
import path from 'path';
export const deleteRoomRepo = async (id: number) => {
    try {
        const room = await prisma.room.findUnique({
            where: {
                id: id,
            },
            include: {
                images: true
            }
        });


        if (!room) {
            throw new Error("Room not found");
        }

        const roomImages = room.images || []
        const roomImagesPath = path.join(__dirname, '../../../public/room-pictures')

        for (const image of roomImages) {
            if (image.image) {
                const imagePath = path.join(roomImagesPath, image.image)
                fs.unlinkSync(imagePath)
            }
            await prisma.roomPicture.delete({
                where: {
                    id: image.id
                }
            })
        }


        const result = await prisma.room.delete({
            where: {
                id: id,
            },
        });
        return result;
    } catch (error) {
        throw error;
    }
};
