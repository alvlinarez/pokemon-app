export interface ILoginProps {
  username: string;
  password: string;
}

export interface IRegisterProps {
  username: string;
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  createdAt?: string;
}

export interface IAuthService {
  login(props: ILoginProps): Promise<IUser>;
  register(props: IRegisterProps): Promise<IUser>;
  logout(): Promise<void>;
  getMe(): Promise<IUser>;
}
