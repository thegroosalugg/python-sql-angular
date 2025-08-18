import { Component, inject, OnInit, signal } from '@angular/core';
import { UserApi } from './user.api';
import { User } from './user.model';
import { Loader } from "app/shared/ui/loader/loader";
import { DatePipe } from '@angular/common';
import { AgePipe } from 'app/shared/pipes/age-pipe';
import { Svg } from "app/shared/ui/svg/svg";

@Component({
     selector: 'app-users',
      imports: [Loader, DatePipe, AgePipe, Svg],
  templateUrl: './users.html',
     styleUrl: './users.scss'
})
export class Users implements OnInit {
  private userAPI = inject(UserApi);
  users = signal<User[]>([]);
  isLoading = signal(false);
  classes = signal(['row', 'col', 'grid'] as const);
  listStyle = signal<'row' | 'col' | 'grid'>(this.classes()[1]);

  setActiveClass = (index: number) => {
    const clamped = Math.max(0, Math.min(index, this.classes().length - 1));
    this.listStyle.set(this.classes()[clamped]);
  }

  ngOnInit() {
    this.isLoading.set(true);
    this.userAPI.getUsers().subscribe({
          next: (res) => this.users.set(res),
         error: (err) => console.log('Error (getUsers):', err),
      complete: (   ) => this.isLoading.set(false),
    })
  }
}
