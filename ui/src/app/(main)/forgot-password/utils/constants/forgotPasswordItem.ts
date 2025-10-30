export interface IForgotPasswordItem {
  number: string;
  title: string;
  description: string;
}
export const CURRENT_FORGOT_PASSWORD_ITEMS: IForgotPasswordItem[] = [
  {
    number: "1",
    title: "Choose your method",
    description: "Select email or phone verification",
  },
  {
    number: "2",
    title: "Check your inbox",
    description: "Follow the instructions we send you",
  },
  {
    number: "3",
    title: "Create a new password",
    description: "Set a strong, secure password",
  },
];
