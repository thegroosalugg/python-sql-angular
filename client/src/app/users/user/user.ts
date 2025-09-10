import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { User as UserModel } from '../user.model';
import { UserApi } from '../user.api';
import { Loader } from "app/shared/ui/loader/loader";
import { UserForm } from "./form/user.form";
import { DatePipe } from '@angular/common';

type UserView = 'controls' | 'edit' | 'activities' | 'button 3' | 'button 4' | 'button 5';

@Component({
     selector: 'app-user',
      imports: [Loader, UserForm, DatePipe],
  templateUrl: './user.html',
     styleUrl: './user.scss'
})
export class User implements OnInit {
  private userAPI    = inject(UserApi);
  private destroyRef = inject(DestroyRef);
  private mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  private isDarkMode = signal(this.mediaQuery.matches);

  views: UserView[] = ['edit', 'activities', 'button 3', 'button 4', 'button 5'];
  userId            = input<string>('');
  user              = signal<UserModel | null>(null);
  isLoading         = signal(true); // data fetching
  activeView        = signal('controls');
  isTransitioning   = signal(false);

  ngOnInit(): void {
    // subscription to get selected user by ID
    this.userAPI.getUser(this.userId()).subscribe({
          next: (res) => this.user.set(res),
         error: (err) => console.log('Error (getUsers):', err),
      complete: (   ) => this.isLoading.set(false),
    });

    // listen to media dark mode changes
    const listener = (e: MediaQueryListEvent) => {
      this.isDarkMode.set(e.matches);
    };

    this.mediaQuery.addEventListener('change', listener);

    this.destroyRef.onDestroy(() => {
      this.mediaQuery.removeEventListener('change', listener);
    });
  }

  // change visible component
  setView = (view: UserView) => {
    const isValid = this.views.includes(view);
    const newView = isValid ? view : 'controls';

    if (newView !== this.activeView()) {
      this.isTransitioning.set(true);
      // Delay the view change to allow exit animation
      setTimeout(() => {
        this.activeView.set(newView);
        this.isTransitioning.set(false);
      }, 150); // Half of total transition time
    }
  };

  // dynamically set button colors based on index (clamped at 9; darker colors on dark mode)
  getBg = (index: number): string => {
    const offset = this.isDarkMode() ? 4 : 1;
    const shade = Math.min(index + offset, 9);
    return `var(--gray-${shade}00)`;
  };
}
