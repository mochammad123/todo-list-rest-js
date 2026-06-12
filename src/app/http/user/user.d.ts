declare namespace IUser {
  interface ResponseUser {
    id: number;
    name: string;
    username: string;
    email: string;
  }

  interface CreateUser {
    name: string;
    username: string;
    email: string;
    password: string;
  }

  interface UpdateUser {
    name?: string;
    username?: string;
    email?: string;
    password?: string;
  }
}
