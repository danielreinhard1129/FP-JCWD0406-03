import { useState, useEffect } from 'react';
import axios from 'axios';
import { Room, RoomPicture } from '../../types/room.type';

interface GetRoomByPropertyIdResponse {
    rooms: Room[];
    roomPictures: RoomPicture[];
}

const useGetRoomByPropertyId = (propertyId: number) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [rooms, setRoom] = useState<Room[]>([]);
    useEffect(() => {
        const fetchRoomByPropertyId = async () => {
            try {
                const response = await axios.get<GetRoomByPropertyIdResponse>(`http://localhost:8000/api/room/property/${propertyId}`);
                setRoom(response.data.rooms);
                setLoading(false);
            } catch (error: any) {
                setError(error);
                setLoading(false);
            }
        };

        fetchRoomByPropertyId();

    }, [propertyId]);


    return { loading, error, rooms };
};

export default useGetRoomByPropertyId;
