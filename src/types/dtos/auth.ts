export type AuthResponseDto = {
  accessToken: string;
  refreshToken: string;
};

export type DeleteAccountResponseDto = {
  errorCode: null;
  message: string;
  result: null;
};