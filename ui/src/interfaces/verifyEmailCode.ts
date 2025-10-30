export interface IVerifyEmailRequest {
  codeOne: string;
  codeTwo: string;
  codeThree: string;
  codeFour: string;
  codeFive: string;
  codeSix: string;
}

export interface IResetPasswordRequest {
  newPassword: string;
  confirmPassword: string;
}
