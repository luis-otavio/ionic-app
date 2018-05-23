import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Ionic2MaskDirective } from "ionic2-mask-directive";

import { AuthProvider } from '../providers/auth/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { UserProvider } from '../providers/user/user';

const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyDmi0GJV07zIi6kGJqOqH_rj6bN6LDJSiA",
  authDomain: "zapnews-423a1.firebaseapp.com",
  databaseURL: "https://zapnews-423a1.firebaseio.com",
  storageBucket: "zapnews-423a1.appspot.com",
  messagingSenderId: "132890866530"
}

@NgModule({
  declarations: [
    MyApp,
    Ionic2MaskDirective,
    HomePage,
    SignupPage,
    SigninPage,
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseAppConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    SigninPage,
  ],
  providers: [
    AuthProvider,
    StatusBar,
    SplashScreen,
    UserProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
