import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

declare var $: any;

@Injectable()

export class UserInterfaceService{

	constructor(){}

	showNotification(from: any, align: any, message: string, status: string) {
          $.notify({
              icon: 'notifications',
              message: message
          }, {
              type: status,
              timer: 3000,
              placement: {
                  from: from,
                  align: align
              }
          });
      }

      beep(){
          var snd = new  Audio("../../assets/audio/xperia_notification.mp3");  
          snd.play();
      }
      
      validateAllFormFields(formGroup: FormGroup) {
		   Object.keys(formGroup.controls).forEach(field => {
		     const control = formGroup.get(field);
		     if (control instanceof FormControl) {
		       control.markAsTouched({ onlySelf: true });
		     } else if (control instanceof FormGroup) {
		       this.validateAllFormFields(control);
		     }
		   });
	    }


}