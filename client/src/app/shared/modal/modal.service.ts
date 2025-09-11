import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private _isOpen    = signal(false);
  private _isClosing = signal(false);

  isOpen    = this._isOpen.asReadonly();
  isClosing = this._isClosing.asReadonly(); // tracks <Modal/> closing (animation) state

  onClose   = signal<(() => void) | null>(null); // set by constructors injecting this service

  open = () => this._isOpen.set(true);

  close = () => {
    this._isClosing.set(true); // start animation

    setTimeout(() => {
      this._isClosing.set(false); // end animation
      this.onClose()?.(); // invoke callback (optional)
      this._isOpen.set(false); // close modal
    }, 500); // matches animation duration
  }
}
