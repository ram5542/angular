// import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Http } from '@angular/http';
import { EscapeHtmlPipe } from './shared/service/pipes/keep-html.pipe';
import { HttpClientModule } from '@angular/common/http';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { SharedModule } from './shared/shared.module';
// import { NguiTabModule } from '@ngui/tab';
import 'hammerjs';

import {LockerModule, Locker, DRIVERS} from 'angular-safeguard';
import { ImageUploadModule } from 'angular2-image-upload';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { AppRoutes } from './app.routing';
import { UserInterfaceService } from './shared/service/notification/notification.service';
import { AuthService } from './shared/service/authservice/authservice.service';
import { CommonService } from './shared/service/common/common.service';
import { ApiService } from './shared/service/api/apiservice.service';
import { TokenService } from './shared/service/api/tokenservice.service';
import { TokenExpiryService } from './shared/service/api/tokenExpiry.service';
import { AuthGuardService } from './shared/service/authguard/authguard.service';
import { AuthgService } from './shared/service/authguard/auth.service';
import { CommonApiFunctionService } from './shared/service/commonapifunctions.service';
import { CacheService } from './providers/cacheService.service';
import { apiFactoryService } from './shared/service/apifactory/apifactory.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { ToastrModule } from 'ng6-toastr-notifications';
import { HeaderComponent } from './header/header.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
@NgModule({

  exports: [
    EscapeHtmlPipe
  ],
  declarations: [
   EscapeHtmlPipe
  

  ]
})
export class keepHtmlModule {}


@NgModule({
  declarations: [
AppComponent,
LayoutComponent,
HeaderComponent,
AdminLoginComponent
// RxwebValidators

  ],
  imports: [
    AuthenticationModule,
    
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    NgxPaginationModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ToastrModule.forRoot() ,
    RouterModule.forRoot(AppRoutes),
    LockerModule,
    ImageUploadModule.forRoot()
    // MaterialModule
  ],
  providers: [
    AuthService,
    apiFactoryService,
    CommonService,
    UserInterfaceService,
    ApiService,
    TokenService,
    TokenExpiryService,
    AuthGuardService,
    AuthgService,
    CommonApiFunctionService,
    CacheService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

