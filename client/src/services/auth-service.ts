import type { IAuthService, ILoginProps, IRegisterProps, IUser } from '../types';
import type { AxiosInstance } from 'axios';

export class AuthService implements IAuthService {
  constructor(private httpClient: AxiosInstance) {}

  async register({ username, password, email }: IRegisterProps) {
    const res = await this.httpClient.post('/auth/register', { username, password, email });
    return res.data.user as IUser;
  }

  async login({ username, password }: ILoginProps) {
    const res = await this.httpClient.post('/auth/login', { username, password });
    return res.data.user as IUser;
  }

  async getMe() {
    const res = await this.httpClient.get('/auth/me');
    return res.data.user as IUser;
  }

  async logout() {
    await this.httpClient.post('/auth/logout');
  }
}
