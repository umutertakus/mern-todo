export interface IUserInfo {
  fullName: string;
  username: string;
  password: string;
}
export interface ILoginUserInfo {
  username: string;
  password: string;
}

export interface ITodos {
  todoId: string;
  content: string;
  completed: boolean;
  owner: string;
}
