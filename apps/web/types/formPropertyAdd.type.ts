// property.type.ts
export interface IPropertyAdd {
  name: string;
  description: string;
  about: string;
  location: string;
  availableStartDate: string;
  availableEndDate: string;
  maxGuest: number;
  type: PropertyType;
}

export enum PropertyType {
  APARTMENT = 'APARTMENT',
  VILLA = 'VILLA',
  TOWNHOUSE = 'TOWNHOUSE',
  OTHER = 'OTHER',
  CONDO = 'CONDO',
  COTTAGE = 'COTTAGE',
}
