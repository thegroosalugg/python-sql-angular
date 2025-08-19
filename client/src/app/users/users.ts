import { Component, inject, OnInit, signal } from '@angular/core';
import { UserApi } from './user.api';
import { User } from './user.model';
import { Loader } from "app/shared/ui/loader/loader";
import { DatePipe } from '@angular/common';
import { AgePipe } from 'app/shared/pipes/age-pipe';
import { Svg } from "app/shared/ui/svg/svg";
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';

type View = 'row' | 'col' | 'grid';

@Component({
     selector: 'app-users',
      imports: [Loader, RouterLink, RouterLinkActive, DatePipe, AgePipe, Svg],
  templateUrl: './users.html',
     styleUrl: './users.scss'
})
export class Users implements OnInit {
  private userAPI = inject(UserApi);
  private route   = inject(ActivatedRoute);

  users           = signal<User[]>([]);
  isLoading       = signal(true);
  hasLoaded       = signal(false);
  isTransitioning = signal(false);
  classes         = signal(['row', 'col', 'grid'] as View[]);
  listStyle       = signal<View>('col');

  ngOnInit() {
    this.userAPI.getUsers().subscribe({
          next: (res) => this.users.set(res),
         error: (err) => console.log('Error (getUsers):', err),
      complete: (   ) => this.isLoading.set(false),
    });

    this.route.queryParamMap.subscribe((params) => {
      const view = params.get('view') as View;
      if (view === this.listStyle() && this.hasLoaded()) return;
      this.isTransitioning.set(true);
      setTimeout(() => {
        this.listStyle.set(this.classes().includes(view) ? view : 'col');
        this.isTransitioning.set(false);
        this.hasLoaded.set(true);
      }, 500);
    });
  }
}
