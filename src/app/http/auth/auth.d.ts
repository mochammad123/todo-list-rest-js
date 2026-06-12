declare namespace IAuth {
  interface ResponseUser {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
  }

  interface RequestRegister {
    name: string;
    username: string;
    email: string;
    password: string;
  }

  interface ResponseRegister {
    id: number;
    name: string;
    username: string;
    email: string;
  }
}
