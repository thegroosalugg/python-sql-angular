import { Component, inject, input, OnInit, signal } from '@angular/core';
import { User as UserModel } from '../user.model';
import { UserApi } from '../user.api';
import { Loader } from "app/shared/ui/loader/loader";
import { UserForm } from "./form/user.form";
import { DatePipe } from '@angular/common';

@Component({
     selector: 'app-user',
      imports: [Loader, UserForm, DatePipe],
  templateUrl: './user.html',
     styleUrl: './user.scss'
})
export class User implements OnInit {
  private userAPI = inject(UserApi);
  userId    = input<string>('');
  user      = signal<UserModel | null>(null);
  isLoading = signal(true); // data fetching

  ngOnInit(): void {
    this.userAPI.getUser(this.userId()).subscribe({
          next: (res) => this.user.set(res),
         error: (err) => console.log('Error (getUsers):', err),
      complete: (   ) => this.isLoading.set(false),
    });
  }
}
