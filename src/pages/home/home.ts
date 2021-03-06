import { Component, Input, ViewChild } from '@angular/core';
import { NavController , Platform,  NavParams, Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { HTTP } from '@ionic-native/http';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { Badge } from '@ionic-native/badge';
// import { Geolocation } from '@ionic-native/geolocation';

import { AppMinimize } from '@ionic-native/app-minimize';
import { BackgroundMode } from '@ionic-native/background-mode';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('a') myInput ;
  @ViewChild(Nav) nav: Nav;
	pageType : any=null;
  beforePage : any = null;
  loginStatus = '';
  errorMsg : string;
  Pin1 : number;
  Pin2 : number;
  Pin3 : number;
  Pin4 : number;
  LoginPage : string = 'LOGIN';
	webServerHost : string = 'https://dportal.dpo.go.th';//'http://127.0.0.1/dportal'

	User : any = {'Username' : '', 'Password' : ''};
	LoginObj : any = {};
  ShowNotify = false;
  SearchList : any = [];
  NotificationList : any = [];
  UnseenNotify : any = 0;
  keyword : string = '';
  constructor(public navCtrl: NavController
          , public platform : Platform
          , public navParams: NavParams 
          , public http:HTTP
          , private storage: Storage
          , private iab: InAppBrowser
          , private sanitizer:DomSanitizer
          , private badge: Badge
          // , private geolocation: Geolocation
          
          , private statusBar: StatusBar
          , private appMinimize: AppMinimize
          , private backgroundMode: BackgroundMode

          ) {
    this.loginStatus = sessionStorage.getItem('loginStatus');
    console.log('loginStatus : ' + this.loginStatus);
    if(this.loginStatus == null){
      this.pageType = 'dashboard';
    }else{

    }
    // this.storage.remove('LoginObj');
    this.backgroundMode.enable();
    this.statusBar.overlaysWebView(true);
    this.statusBar.show();
    this.statusBar.backgroundColorByHexString('#01a3a4');

    if(this.pageType == null){
    	this.pageType = this.navParams.get("pageType");
      console.log('PAGE TYPE = ' + this.pageType);
    }
    // this.badge.set(10);
    // this.badge.increase(1);
    // console.log(this.pageType);
    storage.get('LoginObj').then((val) => {
      console.log('Your age is ', val);
      if(val != null && val != ''){
        this.LoginObj = JSON.parse(val);
        console.log(this.LoginObj.UserID);
        this.LoginPage = 'PIN-LOGIN';

        
        this.getNotifications();  
        setInterval(() => { 
          console.log('Get Notification');
           this.getNotifications();  
        }, 360000);
        
        if(this.pageType != undefined && this.pageType != null){
          // var encode = (JSON.stringify(this.LoginObj));
          // this.pageType = this.webServerHost + '/mobile/#/' + this.pageType;// + '/' + encode;
          // this.pageType = this.sanitizer.bypassSecurityTrustResourceUrl(this.pageType);
          // console.log(this.pageType);
          // alert(this.pageType);
        }

        
      }
    });

    this.platform.ready().then(() => {
      
      this.platform.registerBackButtonAction(() => {
         this.appMinimize.minimize();
      });

    })
  }


  moveFocus(nextElement) {
    nextElement.setFocus();
  }

  login(User){
    if(User.Username != '' && User.Password != ''){
    	console.log(this.webServerHost + '/dpo/public/login/');
      this.http.setDataSerializer('json');
    	this.http.post( this.webServerHost + '/dpo/public/login/', {'obj_login':User}, {"Content-Type": "application/json"})
      .then(data => {
        var res = JSON.parse(data.data);
        if(res.data.STATUS == 'OK'){
          this.LoginObj = res.data.DATA.UserData;
          if(this.LoginObj.PinID == undefined || this.LoginObj.PinID == null || this.LoginObj.PinID == ''){
            this.LoginPage = 'PIN-SETTING';
          }else{
            this.storage.set('LoginObj', JSON.stringify(this.LoginObj));
            this.setPageType('news');
            this.getNotifications();

            sessionStorage.setItem('loginStatus', 'Y');
            this.loginStatus = sessionStorage.getItem('loginStatus');
            console.log('result login status : ' + this.loginStatus);
          }
          // this.LoginPage = 'PIN-SETTING';
          this.errorMsg = '';
        }else{
          this.errorMsg = res.data.DATA;
          this.User.Password = '';
        }
        
      })
      .catch(error => {

        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);

      });
    }else{
      this.errorMsg = 'กรุณาระบุชื่อผู้ใช้งานและรหัสผ่าน';
    }
  }

  loginWithPin(userID, element){
    console.log('Pin Login..' + this.LoginObj.UserID);
    var pin =  this.Pin1 +''+ this.Pin2 +''+ this.Pin3 +''+ this.Pin4;
    var params = {UserID : this.LoginObj.UserID, PinID : pin};
    // console.log(this.webServerHost + '/dpo/public/login/');
    this.http.setDataSerializer('json');
    this.http.post( this.webServerHost + '/dpo/public/login/pin/', {'obj_login':params}, {"Content-Type": "application/json"})
    .then(data => {
      // console.log(data.data);
      var res = JSON.parse(data.data);
      if(res.data.STATUS == 'OK'){
        this.LoginObj = res.data.DATA.UserData;
        this.setPageType('news');
        this.getNotifications();
        sessionStorage.setItem('loginStatus', 'Y');
        this.loginStatus = sessionStorage.getItem('loginStatus');
        console.log('result login status : ' + this.loginStatus);

        this.errorMsg = '';
      }else{
        this.errorMsg = res.data.DATA;
        this.Pin1 = null;
        this.Pin2 = null;
        this.Pin3 = null;
        this.Pin4 = null;
        element.setFocus();
      }
    })
    .catch(error => {

      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);

    });
  }

  switchLogin(type){
    this.LoginPage = type;
  }

  pinSetting(userID){
    console.log('Pin setting..');
    var pin =  this.Pin1 +''+ this.Pin2 +''+ this.Pin3 +''+ this.Pin4;
    var params = {UserID : userID, PinID : pin};
    this.http.setDataSerializer('json');
    this.http.post( this.webServerHost + '/dpo/public/login/pin/setting/', {'obj_setting':params}, {"Content-Type": "application/json"})
    .then(data => {
      var res = JSON.parse(data.data);
      if(res.data.STATUS == 'OK'){
        this.LoginObj = res.data.DATA.UserData;
        this.setPageType('news');
        this.getNotifications();
        this.errorMsg = '';
      }else{
        this.errorMsg = res.data.DATA;
      }
    })
    .catch(error => {

      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);

    });
  }

  setPageType(page){
    // console.log((JSON.stringify(this.LoginObj)));
    // var encode = btoa((encodeURIComponent(JSON.stringify(this.LoginObj))));
    // this.pageType = this.webServerHost + '/mobile/#/' + page + '/' + encode;
    // console.log(this.pageType);
    // this.pageType = this.sanitizer.bypassSecurityTrustResourceUrl(this.pageType);
    this.pageType = page;
    // alert(this.pageType);
  }

  openWeb(url, fab)
   {
     fab.close();
     var openurl = this.webServerHost + '/mobile' + url + '//' + btoa((encodeURIComponent(JSON.stringify(this.LoginObj))));// + (JSON.stringify(this.LoginObj));
     console.log(openurl);
     // url = url + '/'+ (JSON.stringify(this.LoginObj));
     const browser = this.iab.create(openurl,'_blank',{location:'yes', 'clearcache' :'yes', 'zoom':'no', 'enableViewportScale':'yes'});
    browser.on('loaderror').subscribe(loadError => {
          console.log("LOG: API Error");
        console.log(loadError.message);
        
    });
    browser.on('loadstop').subscribe((event) => {
          console.log("LOG: API Response");
          console.log(event.bubbles);
          console.log(event.code);
          // console.log(event.composed);
          console.log(event.message);
          browser.show();
          // console.log(event.message);
        });
   }

   openWebExternal(url, fab){
     fab.close();
     console.log(url);
     // url = url + '/'+ (JSON.stringify(this.LoginObj));
     const browser = this.iab.create(url,'_blank',{location:'no', 'clearcache' :'yes'});
      browser.on('loaderror').subscribe(loadError => {
          console.log(loadError);
      });
      browser.on('loadstop').subscribe((event) => {
          console.log("LOG: API Response");
          console.log(event.code);
          console.log(event.message);
        });
   }

   showNotify(){
     if(!this.ShowNotify){
       this.ShowNotify = true;
     }else{
       this.ShowNotify = false;  
     }
     
   }

   searchNews(keyword){
     console.log('search : ' + encodeURIComponent(keyword));
     this.http.get( this.webServerHost + '/dpo/public/searchNews/' + encodeURIComponent(keyword), {}, {})
      .then(data => {
        var res = JSON.parse(data.data);
        // console.log(JSON.stringify(res));
        if(res.data.STATUS == 'OK'){
          this.SearchList = res.data.DATA.NewsList;
          this.setPageType('search');
          this.errorMsg = '';
          if(this.SearchList.length == 0){
            this.errorMsg = 'ไม่พบผลลัพธ์การค้นหา';
          }
        }else{
          this.errorMsg = 'ไม่พบผลลัพธ์การค้นหา';
        }
      })
      .catch(error => {

        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);

      });
   }

   getNotifications(){
     var regionID = this.LoginObj.RegionID;
     var userID = this.LoginObj.UserID;
     var groupID = this.LoginObj.GroupID;
     this.http.get( this.webServerHost + '/dpo/public/getNotificationList/'+regionID+'/'+groupID+'/'+userID+'/0', {}, {})
    .then(data => {
      var res = JSON.parse(data.data);
      // console.log(res);
      if(res.data.STATUS == 'OK'){
        this.NotificationList = res.data.DATA.NotificationList;
        this.UnseenNotify = res.data.DATA.totalNewNotifications;
        this.badge.set(this.UnseenNotify);
        // this.setPageType('search');
        // console.log(JSON.stringify(this.NotificationList));
        this.errorMsg = '';
      }else{
        this.errorMsg = 'ไม่พบการแจ้งเตือน';
      }
    })
    .catch(error => {

      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);

    });
   }

   backPage(){
     this.pageType = this.beforePage;
   }

   openPage(pageType, fab) {
     fab.close();
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // if(pageType == 'MIS'){
    //   this.openWeb(this.webServerHost + '/' + pageType);
    // }else{
    //   console.log(pageType);
    //   this.nav.setRoot(HomePage, {pageType: pageType, 'loggedin':true});  
    // }
    if(pageType != this.beforePage){
      this.beforePage = this.pageType;
    }
    this.pageType = pageType;
  }

   goUnderContruction(){
     alert('Car Reservation Menu Is Unavailable At This Time ! ');
   }

   subStringNews(text){
     return text.substring(0,150) + '...';
   }

   convertDateToFullThaiDateTime(date){
    if(date != null && date != ''){
          var dateTxt = '';
          var monthTxt = '';
          var dateTimeArr = date.split(' ');
          var dateArr = dateTimeArr[0].split('-');
          
          switch(parseInt(dateArr[1])){
              case 1 : monthTxt = 'มกราคม';break;
              case 2 : monthTxt = 'กุมภาพันธ์';break;
              case 3 : monthTxt = 'มีนาคม';break;
              case 4 : monthTxt = 'เมษายน';break;
              case 5 : monthTxt = 'พฤษภาคม';break;
              case 6 : monthTxt = 'มิถุนายน';break;
              case 7 : monthTxt = 'กรกฎาคม';break;
              case 8 : monthTxt = 'สิงหาคม';break;
              case 9 : monthTxt = 'กันยายน';break;
              case 10 : monthTxt = 'ตุลาคม';break;
              case 11 : monthTxt = 'พฤศจิกายน';break;
              case 12 : monthTxt = 'ธันวาคม';break;
          }
          return dateArr[2] + ' ' + monthTxt + ' ' + (parseInt(dateArr[0]) + 543) + ' ' + dateTimeArr[1];
      }else{
        return '';
      }
    }

}
