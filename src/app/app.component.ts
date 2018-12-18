import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, url: any}>;
  LoginObj : any = {};
  webServerHost : string = 'https://dportal.dpo.go.th';//'http://127.0.0.1/dportal'

  constructor(public platform: Platform
              , public statusBar: StatusBar
              , public splashScreen: SplashScreen
              , private storage: Storage
              , private iab: InAppBrowser) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'ข่าวประชาสัมพันธ์', url: '/mobile/#/news' },
      { title: 'ลิ้งค์ที่เกี่ยวข้อง', url: '/mobile/#/link' },
      { title: 'สมุดโทรศัพท์ภายใน', url: '/mobile/#/telephonebook_internal' },
      { title: 'สมุดโทรศัพท์ภายนอก', url: '/mobile/#/telephonebook_external' },
      { title: 'MIS', url: '/MIS' },
      { title: 'ข้อมูลส่วนตัว', url: '/mobile/#/user_profile' }
    ];

    storage.get('LoginObj').then((val) => {
      if(val != null && val != ''){
        this.LoginObj = JSON.parse(val);
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(pageType) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(HomePage, {pageType: pageType});
  }

  openWeb(url)
   {
     var openurl = url + '/' + btoa((encodeURIComponent(JSON.stringify(this.LoginObj))));// + (JSON.stringify(this.LoginObj));
     console.log(openurl);
     // url = url + '/'+ (JSON.stringify(this.LoginObj));
     const browser = this.iab.create(openurl,'_blank',{location:'yes', 'clearcache' :'yes'});
      browser.on('loaderror').subscribe(loadError => {
          console.log(loadError);
      });
   }
}
