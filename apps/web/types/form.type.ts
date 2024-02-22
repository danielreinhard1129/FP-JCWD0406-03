export interface IForm {
  username: string;
  password: string;
  email: string;
  contact: string;
  alamat: string;
  roleId: number; // Update roleId to accept only "admin" or "user"
  confirmPassword: string;
}
