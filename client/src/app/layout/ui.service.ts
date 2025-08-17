import { Injectable, signal, DestroyRef, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UIService {
  destroyRef  = inject(DestroyRef);

  private  _showHeader = signal(true);
  private _showSidebar = signal('');
  private      _height = signal(0);
  private   lastScroll = 0;

  readonly  showHeader = this._showHeader.asReadonly();
  readonly showSidebar = this._showSidebar.asReadonly();
  readonly      height = this._height.asReadonly();

   openSidebar = (id: string) => this._showSidebar.set(id);
  closeSidebar = () => this._showSidebar.set('');
     setHeight = (height: number) => this._height.set(height);

  constructor() {
    const handleScroll = () => {
      const current = window.scrollY;
      this._showHeader.set(current < this.lastScroll || current < 50);
      this.lastScroll = current;
    };

    window.addEventListener('scroll', handleScroll);
    this.destroyRef.onDestroy(() => window.removeEventListener('scroll', handleScroll));
  }
}
