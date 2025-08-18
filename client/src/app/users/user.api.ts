import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appMetadata } from 'app/app.meta';
import { User } from './user.model';

const { apiUrl } = appMetadata;

@Injectable({ providedIn: 'root' })
export class UserApi {
  private httpClient = inject(HttpClient);

  getUsers = () => this.httpClient.get<User[]>(apiUrl);
}
