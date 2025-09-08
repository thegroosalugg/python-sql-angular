import { Component, inject, OnInit, signal } from '@angular/core';
import { UserApi } from './user.api';
import { User } from './user.model';
import { Loader } from "app/shared/ui/loader/loader";
import { DatePipe } from '@angular/common';
import { AgePipe } from 'app/shared/pipes/age-pipe';
import { Svg } from "app/shared/ui/svg/svg";
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscriptions } from 'app/shared/services/subscriptions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type View = 'grid' | 'row' | 'col';

@Component({
     selector: 'app-users',
      imports: [Loader, RouterLink, RouterLinkActive, DatePipe, AgePipe, Svg],
  templateUrl: './users.html',
     styleUrl: './users.scss'
})
export class Users implements OnInit {
  private userAPI = inject(UserApi);
  private subs    = inject(Subscriptions);
  private route   = inject(ActivatedRoute);
  // Store observable at injection; automatically unsubscribes on component destroy
  private params$ = this.route.queryParamMap.pipe(takeUntilDestroyed());

  users           = signal<User[]>([]);
  isLoading       = signal(true); // data fetching
  hasLoaded       = signal(false); // keep loader in view until param query && data loaded
  isTransitioning = signal(false); // param query swapping
  classes         = signal<View[]>(['grid', 'row', 'col']); // map reusable links => less boilerplate HTML
  listStyle       = signal<View>('grid'); // active css class

  ngOnInit() {
    // fetch all users
    const httpSub = this.userAPI.getUsers().subscribe({
          next: (res) => this.users.set(res),
         error: (err) => console.log('Error (getUsers):', err),
      complete: (   ) => this.isLoading.set(false),
    });

    // subscribe to param query changes
    const routeSub = this.params$.subscribe((params) => {
      const view = params.get('view') as View;
      if (view === this.listStyle() && this.hasLoaded()) return;
      this.isTransitioning.set(true); // toggled every param query change
      setTimeout(() => {
        this.listStyle.set(this.classes().includes(view) ? view : 'grid');
        this.isTransitioning.set(false);
        this.hasLoaded.set(true); // toggled only once, on initial query detection
      }, 500); // standard app animation timer
    });

    // monitor subscriptions
    this.subs.register(httpSub, routeSub);
    this.subs.logActive();
  }
}
