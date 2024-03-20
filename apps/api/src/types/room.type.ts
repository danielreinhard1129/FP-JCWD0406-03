// types/room.type.ts

export enum RoomStatus {
  AVAILABLE = "AVAILABLE",
  OCCUPIED = "OCCUPIED",
  UNDER_RENOVATION = "UNDER_RENOVATION",
}

export enum RoomType {
  LUXURY = "LUXURY",
  DELUXE = "DELUXE",
  SUPERIOR = "SUPERIOR",
  EXECUTIVE = "EXECUTIVE",
  CLUB = "CLUB",
  STANDARD = "STANDARD",
}

export interface IRoom {
  id: number;
  propertyId: number;
  type: RoomType;
  price: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  status: RoomStatus;
  bedroom: string
  bathroom: string
  spaciousRoom: string
}

export interface RoomPicture {
  id: number;
  roomId: number;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}
