"use client";
import UsersTable from "./UsersTable/UsersTable";
import UserDetailsModal from "./UserModals/UserDetailsModal";
import ImageViewerModal from "./UserModals/ImageViewerModal";
import AddUserModal from "./UserModals/AddUserModal";
import EditUserModal from "./UserModals/EditUserModal";
import DeleteUserModal from "./UserModals/DeleteUserModal";
import UsersChartsRecharts from "./UsersChartsRecharts";
import Button from "@/ui/components/Button";
import { IconPlus } from "@tabler/icons-react";
import { IUseUsers } from "../hooks/useUsers";

interface IUsersContentProps {
  usersData: IUseUsers;
}

export default function UsersContent({
  usersData,
}: IUsersContentProps): React.ReactNode {
  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-text-black)]">
            Users Management
          </h2>
          <p className="text-sm text-[var(--color-text-gray)] mt-1">
            Manage and view all users in the system
          </p>
        </div>
        <Button
          variant="primary"
          className="flex items-center gap-2"
          onClick={usersData.handleOpenAddUserModal}
        >
          <IconPlus className="w-5 h-5" />
          Add User
        </Button>
      </div>

      {/* Users Charts - Recharts */}
      <UsersChartsRecharts
        users={usersData.users}
        isLoading={usersData.isLoading}
      />

      {/* Users Table */}
      <UsersTable
        users={usersData.users}
        onUserClick={usersData.handleUserClick}
        currentPage={usersData.currentPage}
        itemsPerPage={10}
        totalItems={usersData.totalItems}
        onPageChange={usersData.handlePageChange}
        onEditUser={usersData.handleEditUser}
        onDeleteUser={usersData.handleDeleteUser}
        onViewDetails={usersData.handleViewDetails}
        isLoading={usersData.isLoading}
      />

      {/* User Details Modal */}
      <UserDetailsModal
        isOpen={usersData.isDetailsModalOpen}
        onClose={usersData.handleCloseDetailsModal}
        user={usersData.selectedUser}
        onViewImage={usersData.handleViewImage}
      />

      {/* Image Viewer Modal */}
      <ImageViewerModal
        isOpen={usersData.isImageViewerOpen}
        onClose={usersData.handleCloseImageViewer}
        imageUrl={usersData.viewerImageUrl}
        imageName="User Profile Picture"
        userName={usersData.selectedUser?.fullName || "User"}
      />

      {/* Add User Modal */}
      <AddUserModal
        isOpen={usersData.isAddUserModalOpen}
        onClose={usersData.handleCloseAddUserModal}
        onSubmit={usersData.handleCreateUser}
        isLoading={usersData.isCreatingUser}
      />

      {/* Edit User Modal */}
      <EditUserModal
        isOpen={usersData.isEditUserModalOpen}
        onClose={usersData.handleCloseEditUserModal}
        onSubmit={usersData.handleUpdateUser}
        isLoading={usersData.isUpdatingUser}
        user={usersData.editingUser}
      />

      {/* Delete User Modal */}
      <DeleteUserModal
        isOpen={usersData.isDeleteUserModalOpen}
        onClose={usersData.handleCloseDeleteUserModal}
        onConfirm={usersData.handleConfirmDeleteUser}
        isLoading={usersData.isDeletingUser}
        user={usersData.userToDelete}
      />
    </div>
  );
}
