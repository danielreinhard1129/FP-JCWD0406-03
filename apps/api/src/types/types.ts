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
