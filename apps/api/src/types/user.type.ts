export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  roleId: number;
  contact: number;
  alamat: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null;
}
