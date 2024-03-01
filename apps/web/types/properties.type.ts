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
    ownerId: number;
    createdAt: Date;
    updatedAt: Date;
    type: PropertyType;
    images: PropertyPicture
}

export interface PropertyPicture {
    id: number;
    images: string[]
    createdAt: Date;
    updatedAt: Date;
    propertyId?: number;
    length: number;
    0: any

}
