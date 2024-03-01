
"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Room, RoomPicture } from '../../types/room.type';

interface GetRoomsResponse {
    rooms: Room[];
    roomPictures: RoomPicture[];
}

const useGetAllRooms = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [rooms, setRooms] = useState<Room[]>([]);
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get<GetRoomsResponse>('http://localhost:8000/api/room/');
                setRooms(response.data.rooms);
                console.log("ini adalah respon data", response.data);


                setLoading(false);
            } catch (error: any) {
                setError(error);
                setLoading(false);
            }
        };

        fetchRooms();

    }, []);


    return { loading, error, rooms, };

};

export default useGetAllRooms;
