export enum RoomType {
  LUXURY = 'LUXURY',
  DELUXE = 'DELUXE',
  SUPERIOR = 'SUPERIOR',
  EXECUTIVE = 'EXECUTIVE',
  CLUB = 'CLUB',
  STANDARD = 'STANDARD',
}
export enum RoomStatus {
  AVAILABLE = 'AVAILABLE',
  OCCUPIED = 'OCCUPIED',
  RENOVATION = 'RENOVATION',
}

export interface Room {
  id: number;
  propertyId: number;
  type: RoomType;
  price: number;
  description: string;
  bedroom: string;
  bathroom: string;
  spaciousRoom: string;
  createdAt: Date;
  updatedAt: Date;
  status: RoomStatus;
  images: RoomPicture[];
}
export interface RoomPicture {
  id: number;
  roomId: number;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}
