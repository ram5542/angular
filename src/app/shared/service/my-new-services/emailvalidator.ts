import { AbstractControl, ValidatorFn } from '@angular/forms';

export function EmailPatternValidator (regex: RegExp): ValidatorFn{
    return (control: AbstractControl) : { [key: string]: any }=>{
        const value =control.value;
        if(value ==''){
            return null;
        }else{
          return !regex.test(value) ? {'emailPatternInvalid': {regex} } : null;  
        }
    }
}