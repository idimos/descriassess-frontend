import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from  './app-routing.module'; 
import { AppComponent } from './app.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialsModule} from './materials.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Firebase services + enviorment module
import { environment } from '../environments/environment';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// App Components
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { VerifyEmailComponent } from './components/auth/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { DashboardComponent} from './components/dashboard/dashboard.component';
import { PagenotfoundComponent } from './components/helpers/pagenotfound/pagenotfound.component';
import { UnauthorizedComponent } from './components/helpers/unauthorized/unauthorized.component';

import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { BuilderModule } from './builder/builder.module';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
  declarations: [ 
    AppComponent,
    ToolbarComponent,
    SignInComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    AboutusComponent,
    DashboardComponent,
    PagenotfoundComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MaterialsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    SlimLoadingBarModule,
    BuilderModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
