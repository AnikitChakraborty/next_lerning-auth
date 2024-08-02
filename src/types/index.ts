export interface User {
  id: number;
  username: string;
  password: string;
  refreshToken?: string; // Optional property for storing JWT token
  accessToken?: string;
}
