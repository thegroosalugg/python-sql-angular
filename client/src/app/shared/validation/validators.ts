import { AbstractControl, Validators, ValidationErrors } from '@angular/forms';

export const flatten = (str: string) => str.replace(/\s+/g, ' ').trim(); // flatten multi whitespaces

export const normalize = (obj: Object) =>
  Object.fromEntries( // flatten all string values in an object
    Object.entries(obj).map(([k, v]) => [k, typeof v === 'string' ? flatten(v) : v])
  );

export const noEmptyStrings = (control: AbstractControl) => {
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

// expressions
export const  A_z_Exp = /^[a-zA-Z\s]+$/; // alphabetic with whitespaces
export const emailExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const baseValidators  = [Validators.required, Validators.minLength(2), noEmptyStrings];
export const nameValidators  = [...baseValidators, Validators.pattern(A_z_Exp)];
export const emailValidators = [...baseValidators, Validators.pattern(emailExp)];
export const dateValidators  = [...baseValidators, validDate];
