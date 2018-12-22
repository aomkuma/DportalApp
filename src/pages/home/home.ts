import { Component, Input, ViewChild } from '@angular/core';
import { NavController , NavParams} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { HTTP } from '@ionic-native/http';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { Badge } from '@ionic-native/badge';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('a') myInput ;
	pageType : any=null;
  errorMsg : string;
  Pin1 : number;
  Pin2 : number;
  Pin3 : number;
  Pin4 : number;
  LoginPage : string = 'LOGIN';
	webServerHost : string = 'https://dportal.dpo.go.th';//'http://127.0.0.1/dportal'

	User : any = {'Username' : 'test@dpo.go.th', 'Password' : 'P@ssw0rd'};
	LoginObj : any = {};
  ShowNotify = false;
  SearchList : any = [];
  NotificationList : any = [];
  UnseenNotify : any = 0;
  keyword : string = '';
  constructor(public navCtrl: NavController
          , public navParams: NavParams 
          , public http:HTTP
          , private storage: Storage
          , private iab: InAppBrowser
          , private sanitizer:DomSanitizer
          , private badge: Badge
          , private statusBar: StatusBar) {
    // this.storage.remove('LoginObj');
    this.statusBar.overlaysWebView(true);
    this.statusBar.show();
    this.statusBar.backgroundColorByHexString('#01a3a4');

  	this.pageType = this.navParams.get("pageType");
    console.log('PAGE TYPE = ' + this.pageType);
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
        setInterval(function(){
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
            setInterval(function(){
              this.getNotifications();  
            }, 360000);
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
      console.log(data.data);
      var res = JSON.parse(data.data);
      if(res.data.STATUS == 'OK'){
        this.LoginObj = res.data.DATA.UserData;
        this.setPageType('news');
        this.getNotifications();
        setInterval(function(){
          this.getNotifications();  
        }, 360000);

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
        setInterval(function(){
          this.getNotifications();  
        }, 360000);
        
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

  openWeb(url)
   {
     var openurl = this.webServerHost + '/mobile/' + url + '//' + btoa((encodeURIComponent(JSON.stringify(this.LoginObj))));// + (JSON.stringify(this.LoginObj));
     console.log(openurl);
     // url = url + '/'+ (JSON.stringify(this.LoginObj));
     const browser = this.iab.create(openurl,'_blank',{location:'yes', 'clearcache' :'yes'});
      browser.on('loaderror').subscribe(loadError => {
          console.log(loadError);
      });
   }

   openWebExternal(url){
     
     console.log(url);
     // url = url + '/'+ (JSON.stringify(this.LoginObj));
     const browser = this.iab.create(url,'_blank',{location:'yes', 'clearcache' :'yes'});
      browser.on('loaderror').subscribe(loadError => {
          console.log(loadError);
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
        console.log(JSON.stringify(res));
        if(res.data.STATUS == 'OK'){
          this.SearchList = res.data.DATA.NewsList;
          this.setPageType('search');
          this.errorMsg = '';
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
      console.log(res);
      if(res.data.STATUS == 'OK'){
        this.NotificationList = res.data.DATA.NotificationList;
        this.UnseenNotify = res.data.DATA.totalNewNotifications;
        this.badge.set(this.UnseenNotify);
        // this.setPageType('search');
        console.log(JSON.stringify(this.NotificationList));
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

   goUnderContruction(){
     alert('Car Reservation Menu Is Unavailable At This Time ! ');
   }

   subStringNews(text){
     return text.substring(0,150);
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
