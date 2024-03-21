import Review from '@/components/Review';
import { Property, PropertyPicture } from './properties.type';
import { Room } from './room.type';
import { IUser } from './user.type';
interface IReview {
  id: number;
  userId: number;
  rating: string;
  riview: string;

  createdAt: Date;
  updatedAt: Date;

  user: IUser;
  TenantReply: Comment[];
  Property: IProperty[];
  propertyId: number;
}

interface IComment {
  id: number;
  riviewId: number;
  tenantId: number;
  reply: string;
  createdAt: Date;
  updatedAt: Date;
  review: IReview[];
  user: IUser[];
}

export interface IPeakSeasonRate {
  id: number;
  propertyId: number;
  startDate: Date;
  endDate: Date;
  price_adjustment_percentage: number;
  createdAt: Date;
  updatedAt: Date;
  property: Property[];
}

export interface IProperty {
  id: number;
  name: string;
  description: string;
  location: string;
  ownerId: number;
  createdAt: Date;
  updatedAt: Date;
  Room: Room[];
  user: IUser[];
  availableStartDate: string;
  availableEndDate: string;
  maxGuest: number;
  PeakSeasonRate: IPeakSeasonRate[];
  Review: IReview[];
  type: PropertyType[];
  images: PropertyPicture[];
  Transaction: ITransaction[];
  transactionId: number;
}

export interface IProperyPicture {
  id: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  Property: Property;
  propertyId: number;
}

export interface ITransaction {
  id: number;
  uuid: string;
  orderId: string;
  roomId: number;
  userId: number;
  checkIn: Date;
  checkOut: Date;
  total: number;
  card_number: string;
  statusTransaction: StatusTransaction;
  paymentProof: string;
  createdAt: Date;
  updatedAt: Date;
  room: Room[];
  user: IUser;

  Property: Property[];
}

enum StatusTransaction {
  CONFIRM = 'CONFIRM',
  REJECT = 'REJECT',
  PENDING = 'PENDING',
  EXPIRED = 'EXPIRED',
  CANCEL = 'CANCEL',
  PROCESS = 'PROCESS',
}

interface IRoomPicture {
  id: number;
  roomId: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  room: Room;
}

export enum PropertyType {
  APARTMENT = 'APARTMENT',
  VILLA = 'VILLA',
  TOWNHOUSE = 'TOWNHOUSE',
  OTHER = 'OTHER',
  CONDO = 'CONDO',
  COTTAGE = 'COTTAGE',
}
