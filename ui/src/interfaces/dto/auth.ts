export interface ILoginRequestDto {
  email: string;
  password: string;
  isRemember: boolean;
}

export interface ILoginResponseDto {
  status: number;
  message: string;
  data: unknown;
}
