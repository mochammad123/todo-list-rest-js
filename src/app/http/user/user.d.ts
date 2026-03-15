declare namespace IUser {
  interface ResponseUser {
    id: number;
    username: string;
  }

  interface CreateUser {
    name: string;
    username: string;
  }

  interface UpdateUser {
    name?: string;
    username?: string;
  }
}
