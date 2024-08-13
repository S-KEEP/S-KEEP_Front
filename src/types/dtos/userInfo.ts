interface User {
  name: string;
  email: string;
  provider: string;
}

export interface UserInfoResponseDto {
  user: User;
}
