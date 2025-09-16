import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appMetadata } from 'app/app.meta';
import { User } from './user.model';

const { apiUrl } = appMetadata;

@Injectable({ providedIn: 'root' })
export class UserApi {
  private httpClient = inject(HttpClient);

  getUsers   = () => this.httpClient.get<User[]>(apiUrl + '/users/all');
  getUser    = (id: string) => this.httpClient.get<User>(`${apiUrl}/user/${id}`);
  updateUser = (id: string, body: Object) =>
    this.httpClient.put<User>(`${apiUrl}/user/update/${id}`, body);
}
