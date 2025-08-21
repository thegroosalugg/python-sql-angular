import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Users } from './users/users';
import { User } from './users/user/user';

export const routes: Routes = [
  { path: '',             component: Home  },
  { path: 'users',        component: Users },
  { path: 'user/:userId', component: User  }
];
