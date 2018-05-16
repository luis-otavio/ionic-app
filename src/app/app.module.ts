
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import {AngularFireModule, FirebaseAppConfig} from 'angularfire2';
import { SignupPage } from '../pages/signup/signup';
import { UserProvider } from '../providers/user/user';
import { AngularFireDatabaseModule } from 'angularfire2/database';

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
    HomePage,
    SignupPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseAppConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
