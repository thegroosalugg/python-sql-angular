import { Component, inject, input, signal } from '@angular/core';
import { AbstractControl, Validators, FormGroup, FormControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { UserApi } from 'app/users/user.api';

const trimValues = (control: AbstractControl) => {
  if (!control.value?.trim()) return { emptyString: true };
  return null;
}

// Validators.email is terrible. Custom logic is a must.
const validEmail = (control: AbstractControl): ValidationErrors | null => {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!pattern.test(control.value)) return { email: true };
  return null;
};

export const validDate = (control: AbstractControl): ValidationErrors | null => {
  const { value } = control;
  if (!value) return null; // leave required check to Validators.required

  const date = new Date(value);
  if (isNaN(date.getTime())) return { invalidDate: true };

  return null;
};

const validators = [Validators.required, trimValues];

@Component({
     selector: 'app-user-form',
      imports: [ReactiveFormsModule],
  templateUrl: './user.form.html',
     styleUrl: './user.form.scss'
})
export class UserForm {
  userId = input.required<string>();
  private isSubmitting = signal(false);
  private userAPI      = inject(UserApi);

  form = new FormGroup({
    first_name: new FormControl('', { validators }),
     last_name: new FormControl('', { validators }),
         email: new FormControl('', { validators: [...validators, validEmail] }),
           dob: new FormControl('', { validators: [...validators,  validDate] })
  });

  fields = [
    { key: 'first_name', label: 'Name'    },
    { key: 'last_name',  label: 'Surname' },
    { key: 'email',      label: 'Email'   },
    { key: 'dob',        label: 'Date of Birth', type: 'date' },
  ];

  // marks controls as touched & dirty: applies NG-CSS classes
  private markSubmitted(formGroup: FormGroup) {
    for (const field in formGroup.controls) {
      const control = formGroup.get(field);
      control?.markAsTouched();
      control?.markAsDirty();
      if (control instanceof FormGroup) this.markSubmitted(control); // reruns loop on nested controls
    }
  }

  onSubmit = () => {
    console.log(this.form.value);
    this.markSubmitted(this.form);
    if (this.form.invalid) return;
    this.isSubmitting.set(true);
    this.userAPI.updateUser(this.userId(), this.form.value).subscribe({
       next: (val) => console.log('(updateUser):', val),
      error: (err) => {
        console.log('Error (updateUser):', err);
        this.isSubmitting.set(false);
      },
      complete: () => {
        this.isSubmitting.set(false);
        this.form.reset();
      },
    });
  };
}
