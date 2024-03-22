export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  roleId: number;
  contact: string | null;
  alamat: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null;
  identityNumber: string
}
