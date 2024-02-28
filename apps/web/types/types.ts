import { string } from 'yup';
import { IUser } from './user.type';

export interface IReview {
  id: number;
  userId: number;
  rating: string;
  riview: string;
  propertyId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IComment {
  id: number;
  riviewId: number;
  tenantId: number;
  reply: string;
}

export interface ITransaction {
  id: number;
  uuid: string;
  roomId: number;
  userId: number;
  paymentMethod: any;
  choosePayment: any;
  checkIn: Date;
  checkOut: Date;
  total: number;
  statusId: number;
  paymentProof: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRoom {
  id: number;
  propertyId: number;
  type: RoomType;
  price: number;
  description: string;

  createdAt: Date;
  updatedAt: Date;
  property: IProperty[];

  pictures: IRoom_pic[];
  status: RoomStatus;

  transaction: ITransaction[];
}

export interface IProperty {
  id: number;
  name: string;
  descripion: string;

  tenantId: number;
  createdAt: Date;
  updatedAt: Date;

  Room: IRoom[];

  image: string;

  user: IUser[];
  Peak_Season_Rate: IPeak_Season_Rate[];
  Review: IReview[];
  type: PropertyType;
  property_pics: IProperty_pic[];
}

export interface IProperty_pic {
  id: number;
  roomId: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  propertyId: number;
  Property: IProperty[];
}

export interface IRoom_pic {
  id: number;
  roomId: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  room: IRoom[];
}

export interface IPeak_Season_Rate {
  id: number;
  propertyId: number;
  startDate: number;
  endDate: number;
  price_adjustment_percentage: number;
  createdAt: Date;
  updatedAt: Date;
  property: IProperty[];
}

enum RoomStatus {
  AVAILABLE,
  OCCUPIED,
  UNDER_RENOVATION,
}

enum PropertyType {
  APARTMENT,
  VILLA,
  TOWNHOUSE,
  OTHER,
  CONDO,
  COTTAGE,
}

enum RoomType {
  LUXURY,
  DELUXE,
  SUPERIOR,
  EXECUTIVE,
  CLUB,
  STANDARD,
}
