export type UserTable = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export type TaskTable = {
  id: number;
  title: string;
  description: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
};
