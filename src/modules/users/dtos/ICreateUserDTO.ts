interface ICreateUserDTO {
  name: string;
  email: string;
  password?: string;
  hashedPassword?: string;
}

export { ICreateUserDTO };
