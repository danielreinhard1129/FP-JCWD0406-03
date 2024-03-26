
"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Room, RoomPicture } from '../../types/room.type';
import { toast } from 'react-toastify';

interface GetRoomsResponse {
    rooms: Room[];
    roomPictures: RoomPicture[];
}

const useGetAllRooms = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [hasNextPage, setHasNextPage] = useState<boolean>(true);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get<GetRoomsResponse>(`http://localhost:8000/api/room?page=${currentPage}`);
                setRooms(response.data.rooms);
                setHasNextPage(response.data.rooms.length > 0);
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            } catch (error: any) {
                setError(error);
                toast.error(error.message)
                setLoading(false);
            }
        };

        setLoading(true);
        fetchRooms();

    }, [currentPage]);

    const nextPage = () => {
        if (hasNextPage) {
            setCurrentPage((prevPage) => prevPage + 1);
        } else {
            toast.warning("Tidak ada lagi data properti yang tersedia.");
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        } else {
            toast.warning("Anda sudah berada di halaman pertama.");
        }
    };

    return { loading, error, rooms, nextPage, prevPage, currentPage, hasNextPage };

};

export default useGetAllRooms;
