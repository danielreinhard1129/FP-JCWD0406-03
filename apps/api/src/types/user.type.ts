export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  roleId: number;
  contact: any;
  alamat: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null;
}
