import { Component, Input, ViewChild } from '@angular/core';
import { NavController , NavParams} from 'ionic-angular';

import { HTTP } from '@ionic-native/http';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { DomSanitizer } from '@angular/platform-browser';

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

	User : any = {'Username' : '', 'Password' : ''};
	LoginObj : any = {};

  constructor(public navCtrl: NavController
          , public navParams: NavParams 
          , public http:HTTP
          , private storage: Storage
          , private iab: InAppBrowser
          ,private sanitizer:DomSanitizer) {
    // this.storage.remove('LoginObj');
  	this.pageType = this.navParams.get("pageType");
    console.log('PAGE TYPE = ' + this.pageType);
    
    console.log(this.pageType);
    storage.get('LoginObj').then((val) => {
      console.log('Your age is ', val);
      if(val != null && val != ''){
        this.LoginObj = JSON.parse(val);
        console.log(this.LoginObj.UserID);
        this.LoginPage = 'PIN-LOGIN';
        
        if(this.pageType != undefined && this.pageType != null){
          var encode = (JSON.stringify(this.LoginObj));
          this.pageType = this.webServerHost + '/mobile/#/' + this.pageType;// + '/' + encode;
          this.pageType = this.sanitizer.bypassSecurityTrustResourceUrl(this.pageType);
          console.log(this.pageType);
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
    	// console.log(this.webServerHost + '/dpo/public/login/');
    	this.http.post( this.webServerHost + '/dpo/public/login/', {'obj_login':User}, {})
      .then(data => {
        var res = JSON.parse(data.data);
        if(res.data.STATUS == 'OK'){
          this.LoginObj = res.data.DATA.UserData;
          if(this.LoginObj.PinID == undefined || this.LoginObj.PinID == null || this.LoginObj.PinID == ''){
            this.LoginPage = 'PIN-SETTING';
          }else{
            this.storage.set('LoginObj', JSON.stringify(this.LoginObj));
            this.setPageType('news');
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
    this.http.post( this.webServerHost + '/dpo/public/login/pin/', {'obj_login':params}, {})
    .then(data => {
      console.log(data.data);
      var res = JSON.parse(data.data);
      if(res.data.STATUS == 'OK'){
        this.LoginObj = res.data.DATA.UserData;
        this.setPageType('news');
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
    this.http.post( this.webServerHost + '/dpo/public/login/pin/setting/', {'obj_setting':params}, {})
    .then(data => {
      var res = JSON.parse(data.data);
      if(res.data.STATUS == 'OK'){
        this.LoginObj = res.data.DATA.UserData;
        this.setPageType('news');
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
    var encode = btoa((encodeURIComponent(JSON.stringify(this.LoginObj))));
    this.pageType = this.webServerHost + '/mobile/#/' + page + '/' + encode;
    console.log(this.pageType);
    this.pageType = this.sanitizer.bypassSecurityTrustResourceUrl(this.pageType);
    
    // alert(this.pageType);
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
