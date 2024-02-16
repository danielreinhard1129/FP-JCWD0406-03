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
