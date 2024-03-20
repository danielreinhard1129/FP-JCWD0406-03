import { Room } from "./room.type";

export enum PropertyType {
    APARTMENT = "APARTMENT",
    VILLA = "VILLA",
    TOWNHOUSE = "TOWNHOUSE",
    OTHER = "OTHER",
    CONDO = "CONDO",
    COTTAGE = "COTTAGE",
}

export interface Property {
    id: number;
    name: string;
    description: string;
    about: string
    ownerId: number;
    createdAt: Date;
    updatedAt: Date;
    type: PropertyType;
    images: PropertyPicture[]
    location: string
    maxGuest: number
    availableStartDate: string
    availableEndDate: string
    user: Iuser
    rooms: Room
}

export interface Iuser {
    id: number
    username: string
    email: string
    alamat: string

}

export interface PropertyPicture {
    id: number;
    image: string
    createdAt: Date;
    updatedAt: Date;
    propertyId?: number;
    length: number;
    0: any

}
