import { AbstractControl, ValidatorFn } from "@angular/forms";

export function emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
      const valid = emailRegex.test(control.value);
      return valid ? null : { 'invalidEmail': true };
    };
}