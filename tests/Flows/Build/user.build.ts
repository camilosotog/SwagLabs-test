import { IUser } from "../Interface/user.interface";

export class UserBuilder {
  private user: IUser = {
    username: "standard_user",
    password: "secret_sauce",
  }

  withUsername(username: string) {
    this.user.username = username;
    return this;
  }

  withPassword(password: string) {
    this.user.password = password;
    return this;
  }

  build(): IUser {
    return { ...this.user };
  }
}