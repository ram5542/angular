import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';

export function MobilePatternValidator(regex: RegExp): ValidatorFn {
    return(control: AbstractControl):  { [key: string]: any } => {
        const value =control.value;
        console.log(value);
        if(value== ''){
            return null;
        }else{
            return !regex.test(value) ? { 'patternMobileInvalid' : { regex } } : null;
        }
    }
}