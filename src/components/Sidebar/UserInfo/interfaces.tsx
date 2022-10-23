export interface User {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  role: string;
}

export interface UserInfoProps {
  user: User;
}
