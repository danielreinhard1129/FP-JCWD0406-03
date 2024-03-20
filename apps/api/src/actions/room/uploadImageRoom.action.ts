import { uploadRoomPictureRepo } from "@/repositories/room/uploadImageRoom.repo";

export const uploadRoomPictureAction = async (
    id: number,
    imagePath: string
) => {
    try {
        const roomPicture = await uploadRoomPictureRepo(id, imagePath);
        return {
            status: 200,
            message: "Room picture uploaded successfully",
            roomPicture,
        };
    } catch (error) {
        throw error;
    }
};
