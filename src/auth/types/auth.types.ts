export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse extends AuthResponse {
  userId: string;
}
