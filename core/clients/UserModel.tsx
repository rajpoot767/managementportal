export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  status: 'active' | 'inactive';
}

export interface UserApiResponse {
  isSuccessful: boolean;
  message: string;
  result: User[];
  count: number | null;
  errorNumber: number;
} 