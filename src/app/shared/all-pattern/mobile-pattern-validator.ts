import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';

export function MobilePatternValidator(regexp: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const value = control.value;

    if (value === '') {
      return null;
    } else{
       
       return !regexp.test(value) ? { 'patternMobileInvalid': { regexp } } : null;
    }
    
   
  };
}