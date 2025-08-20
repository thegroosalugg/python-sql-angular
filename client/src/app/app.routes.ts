import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Users } from './users/users';

export const routes: Routes = [
  { path: '',      component: Home  },
  { path: 'users', component: Users }
];
