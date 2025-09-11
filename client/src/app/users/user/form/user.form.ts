import { Component, inject, model, OnInit, signal } from '@angular/core';
import {
  AbstractControl,
  Validators,
  FormGroup,
  FormControl,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';
import { ObjMap } from 'app/shared/types/shared.types';
import { UserApi } from 'app/users/user.api';
import { User } from 'app/users/user.model';
import { Modal } from 'app/shared/modal/modal';
import { ModalService } from 'app/shared/modal/modal.service';

const flatten = (str: string) => str.replace(/\s+/g, ' ').trim(); // flatten multi whitespaces

const normalize = (obj: Object) =>
  Object.fromEntries( // flatten all string values in an object
    Object.entries(obj).map(([k, v]) => [k, typeof v === 'string' ? flatten(v) : v])
  );

const noEmptyStrings = (control: AbstractControl) => {
  if (!control.value?.trim()) return { emptyString: true };
  return null;
}

export const validDate = (control: AbstractControl): ValidationErrors | null => {
  const { value } = control;
  if (!value) return null; // leave required check to Validators.required

  const date = new Date(value);
  if (isNaN(date.getTime())) return { invalidDate: true };

  return null;
};

const    A_z_Exp = /^[a-zA-Z\s]+$/;
const   emailExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const validators = [Validators.required, Validators.minLength(2), noEmptyStrings];

@Component({
     selector: 'app-user-form',
      imports: [ReactiveFormsModule, Modal],
  templateUrl: './user.form.html',
     styleUrl: './user.form.scss'
})
export class UserForm implements OnInit {
  user   = model<User | null>();
  errors = signal<ObjMap>({});
  private isSubmitting = signal(false);
  private userAPI      = inject(UserApi);
  private modal        = inject(ModalService);

  form = new FormGroup({
    first_name: new FormControl('', { validators: [...validators, Validators.pattern(A_z_Exp) ] }),
     last_name: new FormControl('', { validators: [...validators, Validators.pattern(A_z_Exp) ] }),
         email: new FormControl('', { validators: [...validators, Validators.pattern(emailExp)] }),
           dob: new FormControl('', { validators: [...validators, validDate] })
  });

  ngOnInit() {
    this.form.patchValue(this.formValues());
  }

  fields = [
    { key: 'first_name', label: 'Name'    },
    { key: 'last_name',  label: 'Surname' },
    { key: 'email',      label: 'Email'   },
    { key: 'dob',        label: 'Date of Birth', type: 'date' },
  ];

  // set default form values: prefill existing data or blank
  private formValues = () => {
    const { first_name = '', last_name = '', email = '', dob = '' } = this.user() ?? {};
    return { first_name, last_name, email, dob };
  }

  // marks controls as touched & dirty: applies NG-CSS classes
  private markSubmitted = (formGroup: FormGroup) => {
    for (const field in formGroup.controls) {
      const control = formGroup.get(field);
      control?.markAsTouched();
      control?.markAsDirty();
      if (control instanceof FormGroup) this.markSubmitted(control); // reruns loop on nested controls
    }
  }

  hasFormChanged = () => {
    const original = normalize(this.formValues());
    const current  = normalize(this.form.value);

    return JSON.stringify(current) !== JSON.stringify(original);
  };

  shouldntSubmit = () => this.form.invalid || this.form.pristine || !this.hasFormChanged();

  onSubmit = () => {
    if (this.isSubmitting()) return; // throttle multi-clicks

    this.markSubmitted(this.form); // show client error styles
    if (this.shouldntSubmit()) return; // prevent invalid client submit

    const original = this.formValues();
    const current  = this.form.value;

    const hasChanged = JSON.stringify(current).trim() !== JSON.stringify(original).trim();
    if (!hasChanged) return; // prevent pointless submit

    const userId = this.user()?.id;
    if (!userId) return; // unlikely scenario security

    this.isSubmitting.set(true); // begin the procedure

    this.userAPI.updateUser(userId, this.form.value).subscribe({
       next: (user) => { // created_at is immutable in server, but returned update value is Date.now()...
         // ...not the real value, so it should not be overwritten if it exists
         this.user.update((prev) => ({ ...prev, ...user, created_at: prev?.created_at ?? user.created_at }))
      },
      error: ({ error }) => {
        this.errors.set(error);
        this.isSubmitting.set(false);
      },
      complete: () => {
        this.isSubmitting.set(false);
        this.errors.set({});
        this.form.reset(this.formValues());
        this.modal.open() // show succes message

        setTimeout(() => {
          this.modal.close();
        }, 1000);
      },
    });
  };
}
