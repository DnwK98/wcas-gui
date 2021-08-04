import { Injectable } from '@angular/core';
import {ApiService} from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private api: ApiService) {
  }

  getInfo(): Promise<User> {
    return this.api.get<User>('/api/me');
  }

  changePassword(oldPassword: string, newPassword: string, newPasswordVerify: string): Promise<any> {
    return this.api.post<any>('/api/me/password', {oldPassword, newPassword, newPasswordVerify});
  }

  removeAccount(): Promise<any> {
    return this.api.delete<any>('/api/me');
  }
}

export interface User {
  email: string;
  created: string;
}
