import { IUser } from "@/interfaces/user";

export default function useAuth() {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const parsedUser: IUser | null = user ? JSON.parse(user) : null;

  return {
    user: parsedUser,
    token,
  };
}
