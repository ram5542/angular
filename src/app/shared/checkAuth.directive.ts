import { Directive, Input, HostListener } from '@angular/core';
@Directive({
    selector: '[checkAuthOnClick]'
})

export class CheckAuthorizationOnClickDirective {
    @Input('clickEvent') clickEvent;
    @Input('isAuth') isAuth: boolean;
    @HostListener('click', ['$event, $event.target'])
    onClick(event, targetElement) {
        console.log(event);
        console.log(this.isAuth, typeof(this.isAuth));
        if (!this.isAuth) {
            event.stopPropagation();
            event.preventDefault();
            event.cancelBuble = true;
            event.stopImmediatePropagation();
            console.log('click event stopped');
        } else {
            this.clickEvent();
        // let x = 'login';
        //   this.clickEvent(x);
        }
    }

    checkAuth() {
      return false;
    }
}