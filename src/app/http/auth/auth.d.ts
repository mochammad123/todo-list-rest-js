declare namespace IAuth {
  interface ResponseUser {
    id: number;
    name: string;
    username: string;
    password: string;
  }

  interface RequestRegister extends Omit<ResponseUser, "id"> {}
}
