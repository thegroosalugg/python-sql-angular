import { Component, inject } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
     selector: 'app-modal',
  templateUrl: './modal.html',
     styleUrl: './modal.scss'
})

export class Modal {
  modal = inject(ModalService);
}
