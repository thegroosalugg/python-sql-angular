import { computed, Injectable, signal } from '@angular/core';
import { Subscription } from 'rxjs';

// Use this service to register and check subscriptions for potential leaks
@Injectable({ providedIn: 'root' })
export class Subscriptions {
  private       subs = signal<Subscription[]>([]);
  private activeSubs = computed(() => this.subs().filter((sub) => !sub.closed));

  register = (...subs: Subscription[]) => this.subs.update((prev) => [...subs, ...prev]);

  logActive = () =>
    console.log('[ACTIVE SUBSCRIPTIONS]:', this.activeSubs().length, this.activeSubs());

  logAll = () => console.log('[ALL SUBSCRIPTIONS]:', this.subs().length, this.subs());
}
