import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NewsPage } from '../pages/news/news';
import { NewsDetailPage } from '../pages/news-detail/news-detail';
import { LinkPage } from '../pages/link/link';
import { ExPhoneBookPage } from '../pages/ex-phone-book/ex-phone-book';
import { InPhoneBookPage } from '../pages/in-phone-book/in-phone-book';
import { RepairPage } from '../pages/repair/repair';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { RoomReservePage } from '../pages/room-reserve/room-reserve';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HTTP } from '@ionic-native/http';
import { IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Badge } from '@ionic-native/badge';
import { CallNumber } from '@ionic-native/call-number';
// import { Geolocation } from '@ionic-native/geolocation';
import { DatePicker } from '@ionic-native/date-picker';
import { AppMinimize } from '@ionic-native/app-minimize';
import { BackgroundMode } from '@ionic-native/background-mode';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NewsPage,
    LinkPage,
    ExPhoneBookPage,
    InPhoneBookPage,
    RepairPage,
    // CarPage,
    UserProfilePage,
    RoomReservePage,
    DashboardPage,
    NewsDetailPage,
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
    // CarPage,
    UserProfilePage,
    RoomReservePage,
    DashboardPage,
    NewsDetailPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
    ,HTTP
    ,InAppBrowser
    ,Badge
    ,CallNumber
    // ,Geolocation
    ,DatePicker
    ,AppMinimize
    ,BackgroundMode
    ,DocumentViewer
  ]
})
export class AppModule {}
