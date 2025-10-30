"use client";
import { useState, useEffect } from "react";
import { userService } from "@/services/user";
import { IUserUI } from "../types/user";
import useAuthListener from "../../hooks/useAuthListener";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 20;

export interface IUseUsers {
  users: IUserUI[];
  currentPage: number;
  totalItems: number;
  isLoading: boolean;
  selectedUser: IUserUI | null;
  isDetailsModalOpen: boolean;
  isImageViewerOpen: boolean;
  viewerImageUrl: string | null;
  isAddUserModalOpen: boolean;
  isCreatingUser: boolean;
  isEditUserModalOpen: boolean;
  isUpdatingUser: boolean;
  editingUser: IUserUI | null;
  isDeleteUserModalOpen: boolean;
  isDeletingUser: boolean;
  userToDelete: IUserUI | null;
  handlePageChange: (page: number) => void;
  handleUserClick: (userId: number) => void;
  handleEditUser: (userId: number) => void;
  handleDeleteUser: (userId: number) => void;
  handleViewDetails: (userId: number) => void;
  handleCloseDetailsModal: () => void;
  handleViewImage: (imageUrl: string) => void;
  handleCloseImageViewer: () => void;
  handleOpenAddUserModal: () => void;
  handleCloseAddUserModal: () => void;
  handleCreateUser: (userData: ICreateUserData) => Promise<void>;
  handleOpenEditUserModal: (userId: number) => void;
  handleCloseEditUserModal: () => void;
  handleUpdateUser: (userData: IEditUserData) => Promise<void>;
  handleOpenDeleteUserModal: (userId: number) => void;
  handleCloseDeleteUserModal: () => void;
  handleConfirmDeleteUser: () => Promise<void>;
}

export interface ICreateUserData {
  fullName: string;
  email: string;
  password: string;
  phone_number: string;
  address: string;
  bio: string;
  role_id: string;
  plan_id: string;
  provider_id: string;
}

export interface IEditUserData {
  fullName: string;
  email: string;
  phone_number: string;
  address: string;
  bio: string;
  role_id: string;
  plan_id: string;
  provider_id: string;
}

export default function useUsers(): IUseUsers {
  const { user: currentUser } = useAuthListener();
  const [users, setUsers] = useState<IUserUI[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<IUserUI | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [viewerImageUrl, setViewerImageUrl] = useState<string | null>(null);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const [editingUser, setEditingUser] = useState<IUserUI | null>(null);
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);
  const [isDeletingUser, setIsDeletingUser] = useState(false);
  const [userToDelete, setUserToDelete] = useState<IUserUI | null>(null);

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, currentUser?.id]);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      console.log("Loading users from backend...");
      const response = await userService.getAllUsers(
        currentPage,
        ITEMS_PER_PAGE
      );

      console.log("Backend response:", response);

      if (response.status < 400 && response.data) {
        const data = response.data;
        console.log("Response data:", data);

        // Handle both array and object responses
        let usersData: IUserUI[] = [];
        let total = 0;

        if (Array.isArray(data)) {
          console.log("Data is array");
          usersData = data;
          total = data?.length;
        } else if (data?.users && Array.isArray(data?.users)) {
          console.log("Data has users array");
          usersData = data.users;
          total = data?.total || data?.pagination?.total || data?.users?.length;
        } else if (data?.pagination?.total) {
          console.log("Data has pagination");
          total = data?.pagination?.total;
        }
        console.log("Users loaded:", usersData?.length, "Total:", total);
        setUsers(usersData);
        setTotalItems(total);
      } else {
        console.error("Response status error:", response.status);
      }
    } catch (error) {
      console.error("Error loading users:", error);
      setUsers([]);
      setTotalItems(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleUserClick = (userId: number) => {
    console.log("User clicked:", userId);
  };

  const handleOpenEditUserModal = (userId: number) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setEditingUser(user);
      setIsEditUserModalOpen(true);
    }
  };

  const handleEditUser = (userId: number) => {
    handleOpenEditUserModal(userId);
  };

  const handleOpenDeleteUserModal = (userId: number) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setUserToDelete(user);
      setIsDeleteUserModalOpen(true);
    }
  };

  const handleCloseDeleteUserModal = () => {
    setIsDeleteUserModalOpen(false);
    setUserToDelete(null);
  };

  const handleConfirmDeleteUser = async () => {
    if (!userToDelete) return;

    setIsDeletingUser(true);
    try {
      const response = await userService.deleteUser(userToDelete.id);
      if (response.status < 400) {
        toast.success("User deleted successfully", {
          description: `${userToDelete.fullName} has been removed from the system`,
          duration: 2000,
        });
        // Reload users after deletion
        loadUsers();
        handleCloseDeleteUserModal();
      } else {
        toast.error("Error deleting user", {
          description: response.message || "Failed to delete user",
          duration: 2000,
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user", {
        description: "An unexpected error occurred",
        duration: 2000,
      });
    } finally {
      setIsDeletingUser(false);
    }
  };

  const handleDeleteUser = (userId: number) => {
    handleOpenDeleteUserModal(userId);
  };

  const handleViewDetails = (userId: number) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setSelectedUser(user);
      setIsDetailsModalOpen(true);
    }
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedUser(null);
  };

  const handleViewImage = (imageUrl: string) => {
    setViewerImageUrl(imageUrl);
    setIsImageViewerOpen(true);
  };

  const handleCloseImageViewer = () => {
    setIsImageViewerOpen(false);
    setViewerImageUrl(null);
  };

  const handleOpenAddUserModal = () => {
    setIsAddUserModalOpen(true);
  };

  const handleCloseAddUserModal = () => {
    setIsAddUserModalOpen(false);
  };

  const handleCreateUser = async (userData: ICreateUserData) => {
    setIsCreatingUser(true);
    try {
      const newUser = {
        fullName: userData.fullName,
        email: userData.email,
        password: userData.password,
        phone_number: userData.phone_number,
        address: userData.address,
        bio: userData.bio,
        profile_picture: "https://avatar.iran.liara.run/public/8",
        join_date: new Date().toISOString(),
        role_id: parseInt(userData.role_id),
        provider_id: parseInt(userData.provider_id),
        plan_id: parseInt(userData.plan_id),
        id: 0,
      };

      const response = await userService.createUser(newUser);
      if (response.status < 400) {
        toast.success("User created successfully", {
          description: `${userData.fullName} has been added to the system`,
          duration: 2000,
        });
        // Reload users after creation
        loadUsers();
        handleCloseAddUserModal();
      } else {
        toast.error("Error creating user", {
          description: response.message || "Failed to create user",
          duration: 2000,
        });
      }
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Error creating user", {
        description: "An unexpected error occurred",
        duration: 2000,
      });
    } finally {
      setIsCreatingUser(false);
    }
  };

  const handleCloseEditUserModal = () => {
    setIsEditUserModalOpen(false);
    setEditingUser(null);
  };

  const handleUpdateUser = async (userData: IEditUserData) => {
    if (!editingUser) return;

    setIsUpdatingUser(true);
    try {
      const updatedUserData = {
        fullName: userData.fullName,
        email: userData.email,
        phone_number: userData.phone_number,
        address: userData.address,
        bio: userData.bio,
        profile_picture: editingUser.profile_picture,
        plan_id: parseInt(userData.plan_id),
      };

      const response = await userService.updateUser(
        editingUser.id,
        updatedUserData
      );
      if (response.status < 400) {
        toast.success("User updated successfully", {
          description: `${userData.fullName} has been updated`,
          duration: 2000,
        });
        // Reload users after update
        loadUsers();
        handleCloseEditUserModal();
      } else {
        toast.error("Error updating user", {
          description: response.message || "Failed to update user",
          duration: 2000,
        });
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user", {
        description: "An unexpected error occurred",
        duration: 2000,
      });
    } finally {
      setIsUpdatingUser(false);
    }
  };

  return {
    users,
    currentPage,
    totalItems,
    isLoading,
    selectedUser,
    isDetailsModalOpen,
    isImageViewerOpen,
    viewerImageUrl,
    isAddUserModalOpen,
    isCreatingUser,
    isEditUserModalOpen,
    isUpdatingUser,
    editingUser,
    isDeleteUserModalOpen,
    isDeletingUser,
    userToDelete,
    handlePageChange,
    handleUserClick,
    handleEditUser,
    handleDeleteUser,
    handleViewDetails,
    handleCloseDetailsModal,
    handleViewImage,
    handleCloseImageViewer,
    handleOpenAddUserModal,
    handleCloseAddUserModal,
    handleCreateUser,
    handleOpenEditUserModal,
    handleCloseEditUserModal,
    handleUpdateUser,
    handleOpenDeleteUserModal,
    handleCloseDeleteUserModal,
    handleConfirmDeleteUser,
  };
}
