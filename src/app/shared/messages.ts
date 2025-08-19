import { AbstractControl } from '@angular/forms';

export function getErrorMessage(
  control: AbstractControl | null,
  fieldName: string
): string | null {
  if (!control) return null;

  if (control.hasError('required')) {
    return `${fieldName} is required`;
  }

  if (control.hasError('invalidEmail')) {
    return `Please enter a valid email address`;
  }

  if (control.hasError('minlength')) {
    const requiredLength = control.getError('minlength').requiredLength;
    return `${fieldName} must be at least ${requiredLength} characters`;
  }

  return null;
}
