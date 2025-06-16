export interface AuthResponse {
  accessToken: string;
}

export interface LoginResponse extends AuthResponse {
  refreshToken: string;
  id: string;
}
