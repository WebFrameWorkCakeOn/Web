export type UserRole = "customer" | "owner";

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  userPhone: string;
  role: UserRole;
}
