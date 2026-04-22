export interface Tabungan {
  readonly idTabungan: number;
  namaTabungan: string;
  totalTabungan: number;
  pemilikTabungan: number;
}

export type CreateTabungan = Omit<Tabungan, "idTabungan">;

export interface User {
  readonly userId: number;
  username: string;
  email: string;
  password: string;
  tabungan?: Tabungan[];
}

export type CreateUser = Omit<User, "tabungan" | "userId">;

export interface SuccessResponse<T> {
  success: true;
  data: T;
  message: string;
}

export interface ErrorResponse {
  success: false;
  message: string;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
