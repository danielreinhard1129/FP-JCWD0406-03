export interface IUser {
  username: string;
  email: string;
  contact: string;
  alamat: string;
  password: string;
  image: string | null;
  roleId: IRole;
}
export interface IRole {
  id: number;
  role: string;
}
