export interface IUserUI {
  id: number;
  fullName: string;
  email: string;
  phone_number: string;
  address: string;
  bio: string;
  profile_picture: string;
  join_date: string;
  role_id: number;
  provider_id: number;
  plan_id?: number;
}

export interface IUsersTableProps {
  users: IUserUI[];
  onUserClick?: (userId: number) => void;
  currentPage?: number;
  itemsPerPage?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  onEditUser?: (userId: number) => void;
  onDeleteUser?: (userId: number) => void;
  onViewDetails?: (userId: number) => void;
  isLoading?: boolean;
}

