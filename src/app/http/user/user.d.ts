declare namespace IUser {
  interface ResponseUser {
    id: number;
    name: string;
    username: string;
  }

  interface CreateUser {
    name: string;
    username: string;
    password: string;
  }

  interface UpdateUser {
    name?: string;
    username?: string;
    password?: string;
  }
}
