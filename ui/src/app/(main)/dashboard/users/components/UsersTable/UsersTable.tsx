"use client";
import UsersTableHeader from "./UsersTableHeader";
import UsersTableBody from "./UsersTableBody";
import UsersTableFooter from "./UsersTableFooter";
import UsersTableSkeleton from "./UsersTableSkeleton";
import { IUserUI, IUsersTableProps } from "../../types/user";

export default function UsersTable({
  users,
  onUserClick,
  currentPage = 1,
  itemsPerPage = 10,
  totalItems,
  onPageChange,
  onEditUser,
  onDeleteUser,
  onViewDetails,
  isLoading = false,
}: IUsersTableProps): React.ReactNode {
  const calculatedTotalItems = totalItems || users.length;

  // Show skeleton while loading
  if (isLoading) {
    return <UsersTableSkeleton />;
  }

  return (
    <div className="rounded-xl border border-[var(--color-gray-border)] bg-white overflow-hidden">
      <UsersTableHeader />
      <UsersTableBody
        users={users}
        onUserClick={onUserClick}
        onEditUser={onEditUser}
        onDeleteUser={onDeleteUser}
        onViewDetails={onViewDetails}
      />
      <UsersTableFooter
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={calculatedTotalItems}
        onPageChange={onPageChange}
      />
    </div>
  );
}

