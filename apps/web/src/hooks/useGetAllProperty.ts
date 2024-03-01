import { useState, useEffect } from 'react';
import axios from 'axios';
import { Property, PropertyPicture } from '../../types/properties.type';
import { baseUrl } from '@/utils/config';


interface GetPropertiesResponse {
    properties: Property[];
    propertyPictures: PropertyPicture[];
}

const useGetAllProperties = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [properties, setProperties] = useState<Property[]>([]);
    const [propertyPictures, setPropertyPictures] = useState<PropertyPicture[]>([]);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get<GetPropertiesResponse>(baseUrl + '/property');

                setProperties(response.data.properties);
                setPropertyPictures(response.data.properties.map(property => property.images));
                setLoading(false);
            } catch (error: any) {
                console.error('API Error:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchProperties();

        // Cleanup function jika diperlukan
        return () => {
            // Lakukan sesuatu jika diperlukan saat komponen dilepas
        };
    }, []);


    return { loading, error, properties, propertyPictures };
};

export default useGetAllProperties;
