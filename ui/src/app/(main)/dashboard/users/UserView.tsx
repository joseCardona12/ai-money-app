"use client";
import UsersContent from "./components/UsersContent";
import useUsers from "./hooks/useUsers";

export default function UserView(): React.ReactNode {
  const usersData = useUsers();

  return (
    <div className="p-6 space-y-6">
      <UsersContent usersData={usersData} />
    </div>
  );
}
