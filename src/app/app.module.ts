import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NewsPage } from '../pages/news/news';
import { LinkPage } from '../pages/link/link';
import { ExPhoneBookPage } from '../pages/ex-phone-book/ex-phone-book';
import { InPhoneBookPage } from '../pages/in-phone-book/in-phone-book';
import { RepairPage } from '../pages/repair/repair';
import { CarPage } from '../pages/car/car';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HTTP } from '@ionic-native/http';
import { IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Badge } from '@ionic-native/badge';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NewsPage,
    LinkPage,
    ExPhoneBookPage,
    InPhoneBookPage,
    RepairPage,
    CarPage,
    UserProfilePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NewsPage,
    LinkPage,
    ExPhoneBookPage,
    InPhoneBookPage,
    RepairPage,
    CarPage,
    UserProfilePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
    ,HTTP
    ,InAppBrowser
    ,Badge
  ]
})
export class AppModule {}
