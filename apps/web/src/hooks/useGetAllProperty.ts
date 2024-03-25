import { useState, useEffect } from 'react';
import axios from 'axios';
import { Property, PropertyPicture } from '../../types/properties.type';
import { baseUrl } from '@/utils/config';
import { toast } from 'react-toastify';

interface GetPropertiesResponse {
    properties: Property[];
    propertyPictures: PropertyPicture[];
}

const useGetAllProperties = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [properties, setProperties] = useState<Property[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [hasNextPage, setHasNextPage] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchLocation, setSearchLocation] = useState<string>('');

    useEffect(() => {

        const fetchProperties = async () => {
            try {
                let response;
                if (searchTerm.trim() === '' && searchLocation.trim() === '') {
                    response = await axios.get<GetPropertiesResponse>(`${baseUrl}/property?page=${currentPage}`);
                } else {
                    response = await axios.get<GetPropertiesResponse>(`${baseUrl}/property?page=${currentPage}&name=${searchTerm}&location=${searchLocation}`);
                }
                setProperties(response.data.properties);
                setHasNextPage(response.data.properties.length > 0);
                setTimeout(() => {
                    setLoading(false);
                }, 1500);
            } catch (error: any) {
                console.error('API Error:', error);
                setError(error);
                setLoading(false);
            }
        };
        setLoading(true);
        fetchProperties();
    }, [currentPage, searchTerm, searchLocation]);

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

    return { loading, error, properties, nextPage, prevPage, currentPage, hasNextPage, setSearchTerm, setSearchLocation, setProperties };
};

export default useGetAllProperties;
