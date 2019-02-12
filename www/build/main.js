webpackJsonp([10],{

/***/ 114:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 114;

/***/ }),

/***/ 155:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/car/car.module": [
		291,
		0
	],
	"../pages/dashboard/dashboard.module": [
		290,
		9
	],
	"../pages/ex-phone-book/ex-phone-book.module": [
		294,
		8
	],
	"../pages/in-phone-book/in-phone-book.module": [
		292,
		7
	],
	"../pages/link/link.module": [
		293,
		6
	],
	"../pages/news-detail/news-detail.module": [
		295,
		5
	],
	"../pages/news/news.module": [
		297,
		4
	],
	"../pages/repair/repair.module": [
		296,
		3
	],
	"../pages/room-reserve/room-reserve.module": [
		298,
		2
	],
	"../pages/user-profile/user-profile.module": [
		299,
		1
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 155;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_http__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_browser__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_badge__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_push__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_app_minimize__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_background_mode__ = __webpack_require__(203);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








// import { Geolocation } from '@ionic-native/geolocation';



var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, platform, navParams, http, storage, iab, sanitizer, badge
        // , private geolocation: Geolocation
        , push, statusBar, appMinimize, backgroundMode) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.navParams = navParams;
        this.http = http;
        this.storage = storage;
        this.iab = iab;
        this.sanitizer = sanitizer;
        this.badge = badge;
        this.push = push;
        this.statusBar = statusBar;
        this.appMinimize = appMinimize;
        this.backgroundMode = backgroundMode;
        this.pageType = null;
        this.beforePage = null;
        this.loginStatus = '';
        this.LoginPage = 'LOGIN';
        this.webServerHost = 'https://dportal.dpo.go.th'; //'http://127.0.0.1/dportal'
        this.User = { 'Username': '', 'Password': '' };
        this.LoginObj = {};
        this.ShowNotify = false;
        this.SearchList = [];
        this.NotificationList = [];
        this.UnseenNotify = 0;
        this.keyword = '';
        this.loginStatus = sessionStorage.getItem('loginStatus');
        console.log('loginStatus : ' + this.loginStatus);
        if (this.loginStatus == null) {
            this.pageType = 'dashboard';
        }
        else {
        }
        // this.storage.remove('LoginObj');
        this.backgroundMode.enable();
        this.statusBar.overlaysWebView(true);
        this.statusBar.show();
        this.statusBar.backgroundColorByHexString('#01a3a4');
        if (this.pageType == null) {
            this.pageType = this.navParams.get("pageType");
            console.log('PAGE TYPE = ' + this.pageType);
        }
        // this.badge.set(10);
        // this.badge.increase(1);
        // console.log(this.pageType);
        storage.get('LoginObj').then(function (val) {
            console.log('Your age is ', val);
            if (val != null && val != '') {
                _this.LoginObj = JSON.parse(val);
                console.log(_this.LoginObj.UserID);
                _this.LoginPage = 'PIN-LOGIN';
                _this.getNotifications();
                setInterval(function () {
                    console.log('Get Notification');
                    _this.getNotifications();
                }, 360000);
                if (_this.pageType != undefined && _this.pageType != null) {
                    // var encode = (JSON.stringify(this.LoginObj));
                    // this.pageType = this.webServerHost + '/mobile/#/' + this.pageType;// + '/' + encode;
                    // this.pageType = this.sanitizer.bypassSecurityTrustResourceUrl(this.pageType);
                    // console.log(this.pageType);
                    // alert(this.pageType);
                }
            }
        });
        this.platform.ready().then(function () {
            _this.push.hasPermission()
                .then(function (res) {
                if (res.isEnabled) {
                    console.log('We have permission to send push notifications');
                }
                else {
                    console.log('We do not have permission to send push notifications');
                }
            });
            // Create a channel (Android O and above). You'll need to provide the id, description and importance properties.
            _this.push.createChannel({
                id: "aomtestchannel1",
                description: "My first test channel",
                // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
                importance: 3
            }).then(function () { return console.log('Channel created'); });
            // Delete a channel (Android O and above)
            _this.push.deleteChannel('testchannel1').then(function () { return console.log('Channel deleted'); });
            // Return a list of currently configured channels
            _this.push.listChannels().then(function (channels) { return console.log('List of channels', channels); });
            // to initialize push notifications
            var options = {
                ios: {
                    alert: 'true',
                    badge: true,
                    sound: 'false'
                },
            };
            var pushObject = _this.push.init(options);
            pushObject.on('notification').subscribe(function (notification) { return console.log('Received a notification', notification); });
            pushObject.on('registration').subscribe(function (registration) { return console.log('Device registered', registration); });
            pushObject.on('error').subscribe(function (error) { return console.error('Error with Push plugin : ', error.message); });
            _this.platform.registerBackButtonAction(function () {
                _this.appMinimize.minimize();
            });
        });
    }
    HomePage.prototype.moveFocus = function (nextElement) {
        nextElement.setFocus();
    };
    HomePage.prototype.login = function (User) {
        var _this = this;
        if (User.Username != '' && User.Password != '') {
            console.log(this.webServerHost + '/dpo/public/login/');
            this.http.setDataSerializer('json');
            this.http.post(this.webServerHost + '/dpo/public/login/', { 'obj_login': User }, { "Content-Type": "application/json" })
                .then(function (data) {
                var res = JSON.parse(data.data);
                if (res.data.STATUS == 'OK') {
                    _this.LoginObj = res.data.DATA.UserData;
                    if (_this.LoginObj.PinID == undefined || _this.LoginObj.PinID == null || _this.LoginObj.PinID == '') {
                        _this.LoginPage = 'PIN-SETTING';
                    }
                    else {
                        _this.storage.set('LoginObj', JSON.stringify(_this.LoginObj));
                        _this.setPageType('news');
                        _this.getNotifications();
                        sessionStorage.setItem('loginStatus', 'Y');
                        _this.loginStatus = sessionStorage.getItem('loginStatus');
                        console.log('result login status : ' + _this.loginStatus);
                    }
                    // this.LoginPage = 'PIN-SETTING';
                    _this.errorMsg = '';
                }
                else {
                    _this.errorMsg = res.data.DATA;
                    _this.User.Password = '';
                }
            })
                .catch(function (error) {
                console.log(error.status);
                console.log(error.error); // error message as string
                console.log(error.headers);
            });
        }
        else {
            this.errorMsg = 'กรุณาระบุชื่อผู้ใช้งานและรหัสผ่าน';
        }
    };
    HomePage.prototype.loginWithPin = function (userID, element) {
        var _this = this;
        console.log('Pin Login..' + this.LoginObj.UserID);
        var pin = this.Pin1 + '' + this.Pin2 + '' + this.Pin3 + '' + this.Pin4;
        var params = { UserID: this.LoginObj.UserID, PinID: pin };
        // console.log(this.webServerHost + '/dpo/public/login/');
        this.http.setDataSerializer('json');
        this.http.post(this.webServerHost + '/dpo/public/login/pin/', { 'obj_login': params }, { "Content-Type": "application/json" })
            .then(function (data) {
            // console.log(data.data);
            var res = JSON.parse(data.data);
            if (res.data.STATUS == 'OK') {
                _this.LoginObj = res.data.DATA.UserData;
                _this.setPageType('news');
                _this.getNotifications();
                sessionStorage.setItem('loginStatus', 'Y');
                _this.loginStatus = sessionStorage.getItem('loginStatus');
                console.log('result login status : ' + _this.loginStatus);
                _this.errorMsg = '';
            }
            else {
                _this.errorMsg = res.data.DATA;
                _this.Pin1 = null;
                _this.Pin2 = null;
                _this.Pin3 = null;
                _this.Pin4 = null;
                element.setFocus();
            }
        })
            .catch(function (error) {
            console.log(error.status);
            console.log(error.error); // error message as string
            console.log(error.headers);
        });
    };
    HomePage.prototype.switchLogin = function (type) {
        this.LoginPage = type;
    };
    HomePage.prototype.pinSetting = function (userID) {
        var _this = this;
        console.log('Pin setting..');
        var pin = this.Pin1 + '' + this.Pin2 + '' + this.Pin3 + '' + this.Pin4;
        var params = { UserID: userID, PinID: pin };
        this.http.setDataSerializer('json');
        this.http.post(this.webServerHost + '/dpo/public/login/pin/setting/', { 'obj_setting': params }, { "Content-Type": "application/json" })
            .then(function (data) {
            var res = JSON.parse(data.data);
            if (res.data.STATUS == 'OK') {
                _this.LoginObj = res.data.DATA.UserData;
                _this.setPageType('news');
                _this.getNotifications();
                _this.errorMsg = '';
            }
            else {
                _this.errorMsg = res.data.DATA;
            }
        })
            .catch(function (error) {
            console.log(error.status);
            console.log(error.error); // error message as string
            console.log(error.headers);
        });
    };
    HomePage.prototype.setPageType = function (page) {
        // console.log((JSON.stringify(this.LoginObj)));
        // var encode = btoa((encodeURIComponent(JSON.stringify(this.LoginObj))));
        // this.pageType = this.webServerHost + '/mobile/#/' + page + '/' + encode;
        // console.log(this.pageType);
        // this.pageType = this.sanitizer.bypassSecurityTrustResourceUrl(this.pageType);
        this.pageType = page;
        // alert(this.pageType);
    };
    HomePage.prototype.openWeb = function (url, fab) {
        fab.close();
        var openurl = this.webServerHost + '/mobile' + url + '//' + btoa((encodeURIComponent(JSON.stringify(this.LoginObj)))); // + (JSON.stringify(this.LoginObj));
        console.log(openurl);
        // url = url + '/'+ (JSON.stringify(this.LoginObj));
        var browser = this.iab.create(openurl, '_blank', { location: 'yes', 'clearcache': 'yes', 'zoom': 'no', 'enableViewportScale': 'yes' });
        browser.on('loaderror').subscribe(function (loadError) {
            console.log("LOG: API Error");
            console.log(loadError.message);
        });
        browser.on('loadstop').subscribe(function (event) {
            console.log("LOG: API Response");
            console.log(event.bubbles);
            console.log(event.code);
            // console.log(event.composed);
            console.log(event.message);
            browser.show();
            // console.log(event.message);
        });
    };
    HomePage.prototype.openWebExternal = function (url, fab) {
        fab.close();
        console.log(url);
        // url = url + '/'+ (JSON.stringify(this.LoginObj));
        var browser = this.iab.create(url, '_blank', { location: 'no', 'clearcache': 'yes' });
        browser.on('loaderror').subscribe(function (loadError) {
            console.log(loadError);
        });
        browser.on('loadstop').subscribe(function (event) {
            console.log("LOG: API Response");
            console.log(event.code);
            console.log(event.message);
        });
    };
    HomePage.prototype.showNotify = function () {
        if (!this.ShowNotify) {
            this.ShowNotify = true;
        }
        else {
            this.ShowNotify = false;
        }
    };
    HomePage.prototype.searchNews = function (keyword) {
        var _this = this;
        console.log('search : ' + encodeURIComponent(keyword));
        this.http.get(this.webServerHost + '/dpo/public/searchNews/' + encodeURIComponent(keyword), {}, {})
            .then(function (data) {
            var res = JSON.parse(data.data);
            // console.log(JSON.stringify(res));
            if (res.data.STATUS == 'OK') {
                _this.SearchList = res.data.DATA.NewsList;
                _this.setPageType('search');
                _this.errorMsg = '';
                if (_this.SearchList.length == 0) {
                    _this.errorMsg = 'ไม่พบผลลัพธ์การค้นหา';
                }
            }
            else {
                _this.errorMsg = 'ไม่พบผลลัพธ์การค้นหา';
            }
        })
            .catch(function (error) {
            console.log(error.status);
            console.log(error.error); // error message as string
            console.log(error.headers);
        });
    };
    HomePage.prototype.getNotifications = function () {
        var _this = this;
        var regionID = this.LoginObj.RegionID;
        var userID = this.LoginObj.UserID;
        var groupID = this.LoginObj.GroupID;
        this.http.get(this.webServerHost + '/dpo/public/getNotificationList/' + regionID + '/' + groupID + '/' + userID + '/0', {}, {})
            .then(function (data) {
            var res = JSON.parse(data.data);
            // console.log(res);
            if (res.data.STATUS == 'OK') {
                _this.NotificationList = res.data.DATA.NotificationList;
                _this.UnseenNotify = res.data.DATA.totalNewNotifications;
                _this.badge.set(_this.UnseenNotify);
                // this.setPageType('search');
                // console.log(JSON.stringify(this.NotificationList));
                _this.errorMsg = '';
            }
            else {
                _this.errorMsg = 'ไม่พบการแจ้งเตือน';
            }
        })
            .catch(function (error) {
            console.log(error.status);
            console.log(error.error); // error message as string
            console.log(error.headers);
        });
    };
    HomePage.prototype.backPage = function () {
        this.pageType = this.beforePage;
    };
    HomePage.prototype.openPage = function (pageType, fab) {
        fab.close();
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        // if(pageType == 'MIS'){
        //   this.openWeb(this.webServerHost + '/' + pageType);
        // }else{
        //   console.log(pageType);
        //   this.nav.setRoot(HomePage, {pageType: pageType, 'loggedin':true});  
        // }
        if (pageType != this.beforePage) {
            this.beforePage = this.pageType;
        }
        this.pageType = pageType;
    };
    HomePage.prototype.goUnderContruction = function () {
        alert('Car Reservation Menu Is Unavailable At This Time ! ');
    };
    HomePage.prototype.subStringNews = function (text) {
        return text.substring(0, 150) + '...';
    };
    HomePage.prototype.convertDateToFullThaiDateTime = function (date) {
        if (date != null && date != '') {
            var dateTxt = '';
            var monthTxt = '';
            var dateTimeArr = date.split(' ');
            var dateArr = dateTimeArr[0].split('-');
            switch (parseInt(dateArr[1])) {
                case 1:
                    monthTxt = 'มกราคม';
                    break;
                case 2:
                    monthTxt = 'กุมภาพันธ์';
                    break;
                case 3:
                    monthTxt = 'มีนาคม';
                    break;
                case 4:
                    monthTxt = 'เมษายน';
                    break;
                case 5:
                    monthTxt = 'พฤษภาคม';
                    break;
                case 6:
                    monthTxt = 'มิถุนายน';
                    break;
                case 7:
                    monthTxt = 'กรกฎาคม';
                    break;
                case 8:
                    monthTxt = 'สิงหาคม';
                    break;
                case 9:
                    monthTxt = 'กันยายน';
                    break;
                case 10:
                    monthTxt = 'ตุลาคม';
                    break;
                case 11:
                    monthTxt = 'พฤศจิกายน';
                    break;
                case 12:
                    monthTxt = 'ธันวาคม';
                    break;
            }
            return dateArr[2] + ' ' + monthTxt + ' ' + (parseInt(dateArr[0]) + 543) + ' ' + dateTimeArr[1];
        }
        else {
            return '';
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('a'),
        __metadata("design:type", Object)
    ], HomePage.prototype, "myInput", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */])
    ], HomePage.prototype, "nav", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Applications/ionic_apps/DportalApp/src/pages/home/home.html"*/'<ion-header *ngIf="this.pageType == null"  style="background-color: #FFF;">\n  <ion-navbar >\n  </ion-navbar>\n</ion-header>\n<ion-header *ngIf="this.pageType != null"  >\n  <ion-navbar >\n    <button ion-button menuToggle>\n      <ion-icon name="menu" color="light"></ion-icon>\n    </button>\n\n    <ion-title>\n      <div style="display: inline-block;">\n        <input placeholder="ค้นหา.." style="width: 70%; border: 1px solid #ccc;float: left; height: 33px;" [(ngModel)]="keyword">\n        <button style="float: left; background-color: #FFF; height: 33px; border-radius: 5px;" (tap)="searchNews(keyword)" [disabled]="keyword == \'\'">\n          <ion-icon name="md-search" color="primary"></ion-icon>\n        </button>\n      </div>\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (tap)="pageType = \'dashboard\'" style="font-weight: bolder;">\n        <ion-icon name="home"  color="light" ></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-buttons end *ngIf="loginStatus == null">\n      <button ion-button icon-only (tap)="pageType = \'login\'; LoginPage = \'PIN-LOGIN\'" style="color:red; font-weight: bolder;">\n        <ion-icon name="md-log-in"  color="light" ></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-buttons end *ngIf="loginStatus !== null">\n      <button ion-button icon-only (tap)="showNotify()" style="color:red; font-weight: bolder;">\n        <ion-icon name="md-notifications"  color="light" ></ion-icon> {{UnseenNotify}}\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <!--\n  <div style="overflow:auto;-webkit-overflow-scrolling:touch; height: 100%; margin-top: 20%; border: none;"  *ngIf="this.pageType != null">\n      \n      <iframe style="width:100%;height:100%;" [src]="pageType"></iframe>\n  </div>\n  -->\n  <div *ngIf="this.pageType != null" style=" height: 100%;">\n    <ion-row responsive-sm responsive-xs>\n      <ion-col >\n        <page-dashboard *ngIf="this.pageType == \'dashboard\'"></page-dashboard>\n        <page-user-profile *ngIf="this.pageType == \'user_profile\'"></page-user-profile>\n        <page-news *ngIf="this.pageType == \'news\'"></page-news>\n        <page-link *ngIf="this.pageType == \'link\'"></page-link>\n        <page-in-phone-book *ngIf="this.pageType == \'telephonebook_internal\'"></page-in-phone-book>\n        <page-ex-phone-book *ngIf="this.pageType == \'telephonebook_external\'"></page-ex-phone-book>\n        <page-repair *ngIf="this.pageType == \'repair\'"></page-repair>\n\n      </ion-col>\n    </ion-row>\n    \n    <ion-row responsive-sm responsive-xs *ngIf="this.pageType == \'search\'">\n      <ion-col style="text-align: center;">\n        <ion-row responsive-sm responsive-xs>\n          <ion-col style="text-align: left;">\n            <u><h4>ผลลัพธ์การค้นหา</h4></u>\n          </ion-col>\n        </ion-row>\n        <span *ngIf="errorMsg != \'\'">{{errorMsg}}</span>\n        <ion-row responsive-sm responsive-xs *ngFor="let data of SearchList">\n          <ion-col style="text-align: left;">\n            <div [innerHtml]="data.NewsTitle" style="color: #FF5C5C;"></div>\n            <div [innerHtml]="subStringNews(data.NewsContent)" style=""></div>\n            <hr>\n          </ion-col>\n        </ion-row>\n      </ion-col>\n    </ion-row>\n    <ion-row responsive-sm responsive-xs>\n      <ion-col style="text-align: center;">\n        <br><br><br><br>\n        \n      </ion-col>\n    </ion-row>\n    \n  </div>\n  <div style="padding-top: 0%;" *ngIf="this.pageType == \'login\' && LoginPage == \'PIN-SETTING\'">\n    <ion-row responsive-sm responsive-xs>\n      <ion-col style="text-align: center;">\n        <img src="assets/imgs/user.png" style="height:100%;">\n      </ion-col>\n    </ion-row>\n    <ion-row responsive-sm responsive-xs>\n      <ion-col style="text-align: center;">\n        กรุณาระบุ PIN 4 หลัก\n      </ion-col>\n    </ion-row>\n    <ion-row responsive-sm responsive-xs  >\n      <ion-col col-2 offset-2>\n        <ion-input [(ngModel)]="Pin1" type="number" autofocus style="border-bottom: 1px solid #999; text-align: center;" max="9" tabindex="1" (keyup)="moveFocus(b)"></ion-input>\n      </ion-col>\n      <ion-col col-2>\n        <ion-input [(ngModel)]="Pin2" type="number" #b style="border-bottom: 1px solid #999; text-align: center;" max="9" tabindex="2" (keyup)="moveFocus(c)"></ion-input>\n      </ion-col>\n      <ion-col col-2>\n        <ion-input [(ngModel)]="Pin3" type="number" #c style="border-bottom: 1px solid #999; text-align: center;" max="9" tabindex="3" (keyup)="moveFocus(d)"></ion-input>\n      </ion-col>\n      <ion-col col-2>\n        <ion-input [(ngModel)]="Pin4" type="number" #d style="border-bottom: 1px solid #999; text-align: center;" max="9" (keyup)="pinSetting(LoginObj.UserID)"></ion-input>\n      </ion-col>\n    </ion-row>\n  </div>\n\n  <div style="padding-top: 0%;" *ngIf="this.pageType == \'login\' && LoginPage == \'PIN-LOGIN\'">\n    <ion-row responsive-sm responsive-xs>\n      <ion-col style="text-align: center;">\n        <img src="assets/imgs/user.png" style="height:100%;">\n      </ion-col>\n    </ion-row>\n    <ion-row responsive-sm responsive-xs>\n      <ion-col style="text-align: center;">\n        กรุณาระบุ PIN 4 หลัก\n      </ion-col>\n    </ion-row>\n    <ion-row responsive-sm responsive-xs  >\n      <ion-col col-2 offset-2>\n        <ion-input [(ngModel)]="Pin1" type="number" #a autofocus style="border-bottom: 1px solid #999; text-align: center;" max="9" tabindex="1" (keyup)="moveFocus(b)"></ion-input>\n      </ion-col>\n      <ion-col col-2>\n        <ion-input [(ngModel)]="Pin2" type="number" #b style="border-bottom: 1px solid #999; text-align: center;" max="9" tabindex="2" (keyup)="moveFocus(c)"></ion-input>\n      </ion-col>\n      <ion-col col-2>\n        <ion-input [(ngModel)]="Pin3" type="number" #c style="border-bottom: 1px solid #999; text-align: center;" max="9" tabindex="3" (keyup)="moveFocus(d)"></ion-input>\n      </ion-col>\n      <ion-col col-2>\n        <ion-input [(ngModel)]="Pin4" type="number" #d style="border-bottom: 1px solid #999; text-align: center;" max="9" (keyup)="loginWithPin(LoginObj.UserID, a)"></ion-input>\n      </ion-col>\n    </ion-row>\n    <ion-row responsive-sm responsive-xs>\n      <ion-col style="text-align: center;">\n        <br><br><br>\n        <a (tap)="switchLogin(\'LOGIN\')">ลอกอินด้วย Username และ Password</a>\n      </ion-col>\n    </ion-row>\n    <ion-row responsive-sm responsive-xs *ngIf="errMsg != \'\'">\n      <ion-col style="text-align: center;">\n        {{errorMsg}}\n      </ion-col>\n    </ion-row>\n  </div>\n\n  <div style="padding-top: 0%;" *ngIf="this.pageType == \'login\' && LoginPage == \'LOGIN\'">\n    <ion-row responsive-sm responsive-xs>\n      <ion-col style="text-align: center;">\n        <img src="assets/imgs/user.png" style="height:100%;">\n      </ion-col>\n    </ion-row>\n    <ion-row responsive-sm responsive-xs>\n      <ion-col col-2 offset-1>\n       <img src="assets/imgs/user.png" style="height:30%; margin-top:10px;">\n      </ion-col>\n      <ion-col col-8>\n        <ion-input placeholder="Username" [(ngModel)]="User.Username" style="border-bottom: 1px solid #999;"></ion-input>\n      </ion-col>\n    </ion-row>\n    <ion-row responsive-sm responsive-xs>\n      <ion-col col-2 offset-1>\n       <img src="assets/imgs/key.png" style="height:30%; margin-top:10px;">\n      </ion-col>\n      <ion-col col-8>\n        <ion-input type="password" placeholder="Password" [(ngModel)]="User.Password" style="border-bottom: 1px solid #999;"></ion-input>\n      </ion-col>\n    </ion-row>\n    <ion-row responsive-sm responsive-xs>\n      <ion-col style="text-align: center;">\n        <img src="assets/imgs/login.png" style="height:30%; margin-top:10px;" (tap)="login(User)">\n        \n      </ion-col>\n    </ion-row>\n    <ion-row responsive-sm responsive-xs>\n      <ion-col style="text-align: center;">\n        <a (tap)="switchLogin(\'PIN-LOGIN\')">ลอกอินด้วย Pin</a>\n      </ion-col>\n    </ion-row>\n    <ion-row responsive-sm responsive-xs *ngIf="errMsg != \'\'">\n      <ion-col style="text-align: center;">\n        {{errorMsg}}\n      </ion-col>\n    </ion-row>\n  </div>\n\n  <ion-content *ngIf="ShowNotify" style="position: absolute; left:10%;right: 0px; width: 90%; height: 550px; background-color: #FFF; border:1px solid #999; border-radius: 10px; z-index: 9999; padding: 10px;">\n     <ion-row responsive-sm responsive-xs *ngFor="let data of NotificationList" class="notify" [ngClass]="{\'unseen-notify\':data.NotificationStatus == \'Unseen\'}" pos>\n      <ion-col style="text-align: left;">\n          <a (tap)="openWeb(data.NotificationUrl)">{{data.NotificationText}}</a>\n          <br>\n          <span style="color:#999;">{{convertDateToFullThaiDateTime(data.PushDateTime)}} น.</span>\n          <hr>\n      </ion-col>\n    </ion-row>\n  </ion-content>\n  <ion-fab bottom left #fab style=" bottom: 3%;" *ngIf="beforePage != null">\n    <button ion-fab color="light" (tap)="backPage()">\n        <ion-icon style="" [color]="light" [name]="\'md-arrow-back\'" item-end></ion-icon>\n    </button>\n         \n  </ion-fab>\n  <ion-fab bottom right #fab style=" bottom: 3%;">\n     <button ion-fab color="secondary">\n        <ion-icon style="" [color]="light" [name]="\'aperture\'" item-end></ion-icon>\n      </button>\n     <ion-fab-list  side="top">\n      <ion-row>\n        <ion-col>\n           <button ion-fab (tap)="openPage(\'news\', fab)" color="light">\n            <ion-icon [name]="\'paper\'" item-end></ion-icon>\n            \n           </button>\n      </ion-col>\n      <ion-col>\n           <button ion-fab (tap)="openPage(\'link\', fab)" color="dark">\n            <ion-icon [name]="\'link\'" item-end></ion-icon>\n           </button>\n      </ion-col>\n      <ion-col>\n           <button ion-fab (tap)="openWeb(\'/#/roomconference\', fab)" color="danger">\n            <ion-icon [name]="\'home\'" item-end></ion-icon>\n           </button>\n      </ion-col>\n      <ion-col>\n           <button ion-fab (tap)="openWeb(\'/#/vehicles/-1\', fab)" color="primary">\n            <ion-icon [name]="\'car\'" item-end></ion-icon>\n           </button>\n      </ion-col>\n      <ion-col>\n           <button ion-fab (tap)="openWeb(\'/#/repair/\', fab)" color="light">\n            <ion-icon [name]="\'build\'" item-end></ion-icon>\n           </button>\n      </ion-col>\n      <ion-col>\n           <button ion-fab (tap)="openWebExternal(\'https://LOMS.dpo.go.th\', fab)" color="dark">\n            <ion-icon [name]="\'man\'" item-end></ion-icon>\n            <ion-icon [name]="\'woman\'" item-end></ion-icon>\n           </button>\n      </ion-col>\n    </ion-row>\n     </ion-fab-list>\n   </ion-fab>\n</ion-content>\n<ion-footer style="height:100px; text-align: center; background-color: #FFF;" *ngIf="false"><!--this.pageType != null-->\n  <ion-row responsive-sm responsive-xs>\n    <ion-col>\n      <img src="assets/imgs/room-icon.png" style="height:60%;" (tap)="openWeb(\'/#/roomconference\')">\n      <br>\n      จองห้องประชุม\n    </ion-col>\n    <ion-col>\n      <img src="assets/imgs/car-icon.png" style="height:60%;" (tap)="openWeb(\'/#/vehicles/-1\')"><!--openWeb(\'/#/carreservation\')-->\n      <br>\n      จองรถ\n    </ion-col>\n    <ion-col>\n      <img src="assets/imgs/repair-icon.png" style="height:60%;" (tap)="openWeb(\'/#/repair/\')"><!-- (tap)="openPage(\'repair\')" -->\n      <br>\n      แจ้งซ่อม\n    </ion-col>\n    <ion-col>\n      <img src="assets/imgs/leave-icon.png" style="height:60%;" (tap)="openWebExternal(\'https://LOMS.dpo.go.th\')">\n      <br>\n      วันลา\n    </ion-col>\n  </ion-row>\n</ion-footer>\n'/*ion-inline-end:"/Applications/ionic_apps/DportalApp/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_http__["a" /* HTTP */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__["c" /* DomSanitizer */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_badge__["a" /* Badge */]
            // , private geolocation: Geolocation
            ,
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_push__["a" /* Push */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_app_minimize__["a" /* AppMinimize */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_background_mode__["a" /* BackgroundMode */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DashboardPage = /** @class */ (function () {
    function DashboardPage(navCtrl, http, storage, iab, navParams) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.http = http;
        this.storage = storage;
        this.iab = iab;
        this.navParams = navParams;
        this.NewsList = [];
        this.LinkList = [];
        this.LoginObj = {};
        this.webServerHost = 'https://dportal.dpo.go.th';
        this.storage.get('LoginObj').then(function (val) {
            console.log(val);
            if (val != null && val != '') {
                _this.LoginObj = JSON.parse(val);
                _this.getNews();
                _this.getLink();
            }
        });
    }
    DashboardPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DashboardPage');
    };
    DashboardPage.prototype.getNews = function () {
        var _this = this;
        console.log('Get News');
        var url = this.webServerHost + "/dpo/public/getNewsListView/0/0/Y";
        this.http.get(url, {}, {})
            .then(function (data) {
            console.log(data.data);
            var res = JSON.parse(data.data);
            _this.NewsList = res.data.DATA.DataList;
            // console.log(JSON.stringify(this.NewsList));
        })
            .catch(function (error) {
            console.log(error.status);
            console.log(error.error); // error message as string
            console.log(error.headers);
        });
    };
    DashboardPage.prototype.getLink = function () {
        var _this = this;
        console.log('Get Link');
        var url = this.webServerHost + '/dpo/public/getLinkList/view/' + this.LoginObj.UserID;
        this.http.get(url, {}, {})
            .then(function (data) {
            console.log(data.data);
            var res = JSON.parse(data.data);
            _this.LinkList = res.data.DATA.DataList;
            console.log(JSON.stringify(_this.LinkList));
        })
            .catch(function (error) {
            console.log(error.status);
            console.log(error.error); // error message as string
            console.log(error.headers);
        });
    };
    DashboardPage.prototype.openWeb = function (url) {
        var browser = this.iab.create(url, '_blank', { location: 'yes', 'clearcache': 'yes' });
        browser.on('loaderror').subscribe(function (loadError) {
            console.log(loadError);
        });
    };
    DashboardPage.prototype.openWebDPO = function (url) {
        var openurl = this.webServerHost + '/mobile' + url + '//' + btoa((encodeURIComponent(JSON.stringify(this.LoginObj)))); // + (JSON.stringify(this.LoginObj));
        console.log(openurl);
        // url = url + '/'+ (JSON.stringify(this.LoginObj));
        var browser = this.iab.create(openurl, '_blank', { location: 'yes', 'clearcache': 'yes', 'zoom': 'no', 'enableViewportScale': 'yes' });
        browser.on('loaderror').subscribe(function (loadError) {
            console.log("LOG: API Error");
            console.log(loadError.message);
        });
        browser.on('loadstop').subscribe(function (event) {
            console.log("LOG: API Response");
            console.log(event.bubbles);
            console.log(event.code);
            // console.log(event.composed);
            console.log(event.message);
            browser.show();
            // console.log(event.message);
        });
    };
    DashboardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-dashboard',template:/*ion-inline-start:"/Applications/ionic_apps/DportalApp/src/pages/dashboard/dashboard.html"*/'<div style="height: 600px;">\n<ion-content padding>\n	<ion-row>\n		<ion-col>\n			\n		</ion-col>\n	</ion-row>\n	<ion-row>\n      <ion-col style="text-align: left;">\n    	<h4><span style="color: #01a3a4;"><u>ข่าว</u></span><u>ประชาสัมพันธ์</u></h4>\n    	<ion-scroll scrollX="true" direction="x" style="min-height: 250px; ">\n	    	<ion-card *ngFor="let data of NewsList" style="width: 260px;">\n		      <ion-card-title>\n		          <b><p [innerHtml]="data.NewsTitle">\n		          </p>\n		        </b>\n		      </ion-card-title>\n		      <img src="{{webServerHost + \'/\' + data.NewsPicture}}" style="height: 170px;" />\n		      \n		    </ion-card>\n		</ion-scroll>\n      </ion-col>\n    </ion-row>\n	<hr>\n    <ion-row>\n      <ion-col style="text-align: left;">\n    	<h4><span style="color: #01a3a4;"><u>ลิ้งค์</u></span><u>ภายนอก</u></h4>\n    	<ion-scroll scrollX="true" direction="x" style="min-height: 80px; ">\n	    	<ion-card *ngFor="let data of LinkList" class="link-card" style="text-align:center; width: 100px;">  \n	    		<ion-row>\n			        <ion-col col-2></ion-col>\n			        <ion-col col-8>\n			          <img src="{{webServerHost + \'/\' + data.LinkIcon}}" style="height: 55px; width: auto; text-align: center;" (tap)="openWeb(data.LinkUrl)" />\n			        </ion-col>\n			        <ion-col col-2></ion-col>\n			      </ion-row>\n	      		\n		      \n		    </ion-card>\n		</ion-scroll>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n		<ion-col style="text-align: center; top: 20px;">\n			<ion-col col-2></ion-col>\n	        <ion-col col-8>\n	          <img src="../assets/imgs/icon.png" style="height: 120px;" />\n	        </ion-col>\n	        <ion-col col-2></ion-col>\n		</ion-col>\n	</ion-row>\n	\n</ion-content>\n</div>\n'/*ion-inline-end:"/Applications/ionic_apps/DportalApp/src/pages/dashboard/dashboard.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__["a" /* HTTP */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__["a" /* InAppBrowser */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
    ], DashboardPage);
    return DashboardPage;
}());

//# sourceMappingURL=dashboard.js.map

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InPhoneBookPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_call_number__ = __webpack_require__(83);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the InPhoneBookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var InPhoneBookPage = /** @class */ (function () {
    function InPhoneBookPage(navCtrl, navParams, http, storage, callNumber) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.storage = storage;
        this.callNumber = callNumber;
        this.webServerHost = 'https://dportal.dpo.go.th';
        this.offset = 0;
        this.LoginObj = {};
        this.PhoneList = [];
        storage.get('LoginObj').then(function (val) {
            if (val != null && val != '') {
                _this.LoginObj = JSON.parse(val);
                _this.getPhone();
            }
        });
    }
    InPhoneBookPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad InPhoneBookPage');
    };
    InPhoneBookPage.prototype.makeCall = function (phone_number) {
        if (phone_number != '') {
            this.callNumber.callNumber(phone_number, true);
        }
    };
    InPhoneBookPage.prototype.getPhone = function () {
        var _this = this;
        var url = this.webServerHost + '/dpo/public/getPhoneBookList/ALL/-/0/1/1/' + this.LoginObj.UserID;
        this.http.get(url, {}, {})
            .then(function (data) {
            var res = JSON.parse(data.data);
            _this.PhoneList = res.data.DATA.DataList;
            console.log(JSON.stringify(_this.PhoneList));
        })
            .catch(function (error) {
            console.log(error.status);
            console.log(error.error); // error message as string
            console.log(error.headers);
        });
    };
    InPhoneBookPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-in-phone-book',template:/*ion-inline-start:"/Applications/ionic_apps/DportalApp/src/pages/in-phone-book/in-phone-book.html"*/'<div>\n	<ion-row responsive-sm responsive-xs>\n      <ion-col style="text-align: center;">\n    	<h4>สมุดโทรศัพท์ภายใน</h4>\n    	<br>\n      </ion-col>\n    </ion-row>\n    <ion-list>\n      <ion-item *ngFor="let data of PhoneList">\n        <ion-thumbnail item-start>\n          <ion-icon name="md-person"></ion-icon>\n        </ion-thumbnail>\n        <h2>{{data.FirstName}} {{data.LastName}}</h2>\n        <p><span (tap)="makeCall(data.Tel)"><ion-icon name="md-phone-portrait"></ion-icon> {{data.Tel}}</span></p>\n        \n      </ion-item>\n    </ion-list>\n    <!-- <ion-row responsive-sm responsive-xs *ngFor="let data of PhoneList" >\n      <ion-col style="text-align: left;">\n      	<ion-icon name="md-person"></ion-icon> {{data.FirstName}} {{data.LastName}}\n      	<br>\n        <br>\n      	<span (tap)="makeCall(data.Tel)"><ion-icon name="md-phone-portrait"></ion-icon> {{data.Tel}}</span>\n    	<br>\n    	<hr>\n      </ion-col>\n    </ion-row> -->\n    \n	\n</div>\n\n'/*ion-inline-end:"/Applications/ionic_apps/DportalApp/src/pages/in-phone-book/in-phone-book.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__["a" /* HTTP */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_call_number__["a" /* CallNumber */]])
    ], InPhoneBookPage);
    return InPhoneBookPage;
}());

//# sourceMappingURL=in-phone-book.js.map

/***/ }),

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LinkPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the LinkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LinkPage = /** @class */ (function () {
    function LinkPage(navCtrl, navParams, http, storage, iab) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.storage = storage;
        this.iab = iab;
        this.webServerHost = 'https://dportal.dpo.go.th';
        this.offset = 0;
        this.LoginObj = {};
        this.LinkList = [];
        storage.get('LoginObj').then(function (val) {
            if (val != null && val != '') {
                _this.LoginObj = JSON.parse(val);
                _this.getLink();
            }
        });
    }
    LinkPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LinkPage');
    };
    LinkPage.prototype.getLink = function () {
        var _this = this;
        var url = this.webServerHost + '/dpo/public/getLinkList/view/' + this.LoginObj.UserID;
        this.http.get(url, {}, {})
            .then(function (data) {
            var res = JSON.parse(data.data);
            _this.LinkList = res.data.DATA.DataList;
            console.log(JSON.stringify(_this.LinkList));
        })
            .catch(function (error) {
            console.log(error.status);
            console.log(error.error); // error message as string
            console.log(error.headers);
        });
    };
    LinkPage.prototype.openWeb = function (url) {
        var browser = this.iab.create(url, '_blank', { location: 'yes', 'clearcache': 'yes' });
        browser.on('loaderror').subscribe(function (loadError) {
            console.log(loadError);
        });
    };
    LinkPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-link',template:/*ion-inline-start:"/Applications/ionic_apps/DportalApp/src/pages/link/link.html"*/'<div>\n	<ion-row responsive-sm responsive-xs>\n      <ion-col style="text-align: center;">\n    	<h4>ลิ้งค์ที่เกี่ยวข้อง</h4>\n    	<br>\n      </ion-col>\n    </ion-row>\n    <ion-row responsive-sm responsive-xs *ngFor="let data of LinkList" >\n      <ion-col style="text-align: center;">\n      	<a (tap)="openWeb(data.LinkUrl)">\n	      	<img src="{{webServerHost + \'/\' + data.LinkIcon}}" alt="ไม่มีรูป" style="height: 80px; width: auto;">\n	    	<div [innerHtml]="data.LinkTopic"></div>\n	    </a>\n    	<br>\n    	<hr>\n      </ion-col>\n    </ion-row>\n    \n	\n</div>\n\n\n'/*ion-inline-end:"/Applications/ionic_apps/DportalApp/src/pages/link/link.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__["a" /* HTTP */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__["a" /* InAppBrowser */]])
    ], LinkPage);
    return LinkPage;
}());

//# sourceMappingURL=link.js.map

/***/ }),

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExPhoneBookPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_call_number__ = __webpack_require__(83);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the ExPhoneBookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ExPhoneBookPage = /** @class */ (function () {
    function ExPhoneBookPage(navCtrl, navParams, http, storage, callNumber) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.storage = storage;
        this.callNumber = callNumber;
        this.webServerHost = 'https://dportal.dpo.go.th';
        this.offset = 0;
        this.LoginObj = {};
        this.PhoneList = [];
        storage.get('LoginObj').then(function (val) {
            if (val != null && val != '') {
                _this.LoginObj = JSON.parse(val);
                _this.getPhone();
            }
        });
    }
    ExPhoneBookPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ExPhoneBookPage');
    };
    ExPhoneBookPage.prototype.makeCall = function (phone_number) {
        if (phone_number != '') {
            this.callNumber.callNumber(phone_number, true);
        }
    };
    ExPhoneBookPage.prototype.getPhone = function () {
        var _this = this;
        var url = this.webServerHost + '/dpo/public/getExternalPhoneBookList/';
        this.http.post(url, { 'offset': 0, 'condition': { 'LoginUserID': this.LoginObj.UserID } }, {})
            .then(function (data) {
            var res = JSON.parse(data.data);
            _this.PhoneList = res.data.DATA.DataList;
            console.log(JSON.stringify(_this.PhoneList));
        })
            .catch(function (error) {
            console.log(error.status);
            console.log(error.error); // error message as string
            console.log(error.headers);
        });
    };
    ExPhoneBookPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-ex-phone-book',template:/*ion-inline-start:"/Applications/ionic_apps/DportalApp/src/pages/ex-phone-book/ex-phone-book.html"*/'<div>\n	<ion-row responsive-sm responsive-xs>\n      <ion-col style="text-align: center;">\n    	<h4>สมุดโทรศัพท์ภายนอก</h4>\n    	<br>\n      </ion-col>\n    </ion-row>\n    <ion-list>\n      <ion-item *ngFor="let data of PhoneList">\n        <ion-thumbnail item-start>\n          <ion-icon name="md-person"></ion-icon>\n        </ion-thumbnail>\n        <h2>{{data.FirstName}} {{data.LastName}}</h2>\n        <p><span (tap)="makeCall(data.Tel)"><ion-icon name="md-phone-portrait"></ion-icon> {{data.Tel}}</span></p>\n        \n      </ion-item>\n    </ion-list>\n    <!--<ion-row responsive-sm responsive-xs  *ngFor="let data of PhoneList">\n      <ion-col style="text-align: left;">\n      	<ion-icon name="md-person"></ion-icon> {{data.FirstName}} {{data.LastName}}\n        <br><br>\n        <span (tap)="makeCall(data.Tel)"><ion-icon name="md-phone-portrait"></ion-icon> {{data.Tel}}</span>\n    	<br>\n    	<hr>\n      </ion-col>\n    </ion-row>\n    -->\n	\n</div>\n\n'/*ion-inline-end:"/Applications/ionic_apps/DportalApp/src/pages/ex-phone-book/ex-phone-book.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__["a" /* HTTP */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_call_number__["a" /* CallNumber */]])
    ], ExPhoneBookPage);
    return ExPhoneBookPage;
}());

//# sourceMappingURL=ex-phone-book.js.map

/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewsDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the NewsDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var NewsDetailPage = /** @class */ (function () {
    function NewsDetailPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    NewsDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad NewsDetailPage');
    };
    NewsDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-news-detail',template:/*ion-inline-start:"/Applications/ionic_apps/DportalApp/src/pages/news-detail/news-detail.html"*/'<!--\n  Generated template for the NewsDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>news-detail</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/Applications/ionic_apps/DportalApp/src/pages/news-detail/news-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
    ], NewsDetailPage);
    return NewsDetailPage;
}());

//# sourceMappingURL=news-detail.js.map

/***/ }),

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RepairPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the RepairPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RepairPage = /** @class */ (function () {
    function RepairPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    RepairPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RepairPage');
    };
    RepairPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-repair',template:/*ion-inline-start:"/Applications/ionic_apps/DportalApp/src/pages/repair/repair.html"*/'<div>\n	<ion-row responsive-sm responsive-xs>\n      <ion-col style="text-align: center;">\n    	<h4>แจ้งซ่อม</h4>\n    	<br>\n      </ion-col>\n    </ion-row>\n    <ion-row responsive-sm responsive-xs *ngFor="let data of PhoneList" >\n      <ion-col style="text-align: left;">\n      	<ion-icon name="md-person"></ion-icon> {{data.FirstName}} {{data.LastName}}\n        <br><br>\n        <span (tap)="makeCall(data.Tel)"><ion-icon name="md-phone-portrait"></ion-icon> {{data.Tel}}</span>\n    	<br>\n    	<hr>\n      </ion-col>\n    </ion-row>\n    \n	\n</div>\n\n'/*ion-inline-end:"/Applications/ionic_apps/DportalApp/src/pages/repair/repair.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
    ], RepairPage);
    return RepairPage;
}());

//# sourceMappingURL=repair.js.map

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_document_viewer__ = __webpack_require__(158);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var NewsPage = /** @class */ (function () {
    function NewsPage(navCtrl, navParams, http, storage, document) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.storage = storage;
        this.document = document;
        this.webServerHost = 'https://dportal.dpo.go.th';
        this.offset = 0;
        this.LoginObj = {};
        this.NewsList = [];
        storage.get('LoginObj').then(function (val) {
            if (val != null && val != '') {
                _this.LoginObj = JSON.parse(val);
                _this.getNews();
            }
        });
    }
    NewsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad NewsPage');
    };
    NewsPage.prototype.getNews = function () {
        var _this = this;
        var url = this.webServerHost + "/dpo/public/getNewsListView/" + this.offset + "/0/Y";
        this.http.get(url, {}, {})
            .then(function (data) {
            var res = JSON.parse(data.data);
            _this.NewsList = res.data.DATA.DataList;
            // console.log(JSON.stringify(this.NewsList));
        })
            .catch(function (error) {
            console.log(error.status);
            console.log(error.error); // error message as string
            console.log(error.headers);
        });
    };
    NewsPage.prototype.viewPDF = function (url) {
        var options = {
            title: 'องค์การส่งเสริมกิจการโคนมแห่งประเทศไทย : เอกสารแนบ'
        };
        this.document.viewDocument(url, 'application/pdf', options);
    };
    NewsPage.prototype.convertDateToFullThaiDateIgnoreTime = function (date) {
        if (date != null && date != '') {
            var dateTxt = '';
            var monthTxt = '';
            var dateTimeArr = date.split(' ');
            var dateArr = dateTimeArr[0].split('-');
            switch (parseInt(dateArr[1])) {
                case 1:
                    monthTxt = 'มกราคม';
                    break;
                case 2:
                    monthTxt = 'กุมภาพันธ์';
                    break;
                case 3:
                    monthTxt = 'มีนาคม';
                    break;
                case 4:
                    monthTxt = 'เมษายน';
                    break;
                case 5:
                    monthTxt = 'พฤษภาคม';
                    break;
                case 6:
                    monthTxt = 'มิถุนายน';
                    break;
                case 7:
                    monthTxt = 'กรกฎาคม';
                    break;
                case 8:
                    monthTxt = 'สิงหาคม';
                    break;
                case 9:
                    monthTxt = 'กันยายน';
                    break;
                case 10:
                    monthTxt = 'ตุลาคม';
                    break;
                case 11:
                    monthTxt = 'พฤศจิกายน';
                    break;
                case 12:
                    monthTxt = 'ธันวาคม';
                    break;
            }
            return dateArr[2] + ' ' + monthTxt + ' ' + (parseInt(dateArr[0]) + 543);
        }
        else {
            return '';
        }
    };
    NewsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-news',template:/*ion-inline-start:"/Applications/ionic_apps/DportalApp/src/pages/news/news.html"*/'<!--\n  Generated template for the NewsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<div style="padding-top: 2%;">\n	<ion-row responsive-sm responsive-xs>\n      <ion-col style="text-align: center;">\n    	<h4>ข่าวประชาสัมพันธ์</h4>\n    	<br>\n      </ion-col>\n    </ion-row>\n    <!-- <ion-row responsive-sm responsive-xs *ngFor="let data of NewsList" >\n      <ion-col style="text-align: center;">\n      	<img src="{{webServerHost + \'/\' + data.NewsPicture}}">\n      	<div [innerHtml]="data.NewsTitle"></div>\n        <span style="text-align: right; color:#999;"><ion-icon name="md-calendar"></ion-icon> {{convertDateToFullThaiDateIgnoreTime(data.NewsDateTime)}}</span>\n        <ion-badge item-end><ion-icon name="eye"></ion-icon> {{data.VisitCount==\'\'?0:data.VisitCount}}</ion-badge>\n      	<br>\n      	<hr>\n      </ion-col>\n      \n    </ion-row> -->\n\n    <ion-card *ngFor="let data of NewsList">\n      <ion-card-title>\n          <b><p [innerHtml]="data.NewsTitle">\n          </p>\n        </b>\n      </ion-card-title>\n      <img src="{{webServerHost + \'/\' + data.NewsPicture}}"/>\n      <ion-card-content>\n        \n        <p [innerHtml]="data.NewsContent.substring(0,200) + \'..\'">\n        </p>\n        \n      </ion-card-content>\n      <span style="text-align: right; color:#999;"><ion-icon name="md-calendar"></ion-icon> {{convertDateToFullThaiDateIgnoreTime(data.NewsDateTime)}}</span>\n        <ion-badge item-end><ion-icon name="eye"></ion-icon> {{data.VisitCount==\'\'?0:data.VisitCount}}</ion-badge>\n        <ion-icon name="md-document" (tap)="viewPDF()"></ion-icon>\n        <br><br>\n    </ion-card>\n</div>\n'/*ion-inline-end:"/Applications/ionic_apps/DportalApp/src/pages/news/news.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__["a" /* HTTP */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_document_viewer__["a" /* DocumentViewer */]])
    ], NewsPage);
    return NewsPage;
}());

//# sourceMappingURL=news.js.map

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoomReservePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the RoomReservePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RoomReservePage = /** @class */ (function () {
    function RoomReservePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    RoomReservePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RoomReservePage');
    };
    RoomReservePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-room-reserve',template:/*ion-inline-start:"/Applications/ionic_apps/DportalApp/src/pages/room-reserve/room-reserve.html"*/'<!--\n  Generated template for the RoomReservePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>room-reserve</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/Applications/ionic_apps/DportalApp/src/pages/room-reserve/room-reserve.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
    ], RoomReservePage);
    return RoomReservePage;
}());

//# sourceMappingURL=room-reserve.js.map

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var UserProfilePage = /** @class */ (function () {
    function UserProfilePage(navCtrl, navParams, http, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.storage = storage;
        this.webServerHost = 'https://dportal.dpo.go.th';
        this.offset = 0;
        this.LoginObj = {};
        this.Data = {};
        this.NewPinID = '';
        this.ConfirmPinID = '';
        storage.get('LoginObj').then(function (val) {
            if (val != null && val != '') {
                _this.LoginObj = JSON.parse(val);
                _this.getUserProfiles();
            }
        });
    }
    UserProfilePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad UserProfilePage');
    };
    UserProfilePage.prototype.getUserProfiles = function () {
        var _this = this;
        var url = this.webServerHost + '/dpo/public/getUserContact/' + this.LoginObj.UserID;
        this.http.get(url, {}, {})
            .then(function (data) {
            var res = JSON.parse(data.data);
            _this.Data = res.data.DATA;
            console.log(JSON.stringify(_this.Data));
        })
            .catch(function (error) {
            console.log(error.status);
            console.log(error.error); // error message as string
            console.log(error.headers);
        });
    };
    UserProfilePage.prototype.saveData = function (Data) {
        var _this = this;
        if (this.NewPinID != '') {
            if (this.ConfirmPinID == '') {
                alert('กรุณายืนยัน PIN ใหม่');
                return false;
            }
            else if (this.NewPinID != this.ConfirmPinID) {
                alert('รหัส PIN ใหม่และ ยืนยันรหัส PIN ใหม่ไม่ตรงกัน กรุณาตรวจสอบข้อมูล');
                return false;
            }
            else if (this.NewPinID == Data.PinID) {
                alert('รหัส PIN ใหม่ ซ้ำกับ PIN เดิม');
                return false;
            }
            else {
                Data.PinID = this.NewPinID;
                console.log(Data.PinID);
            }
        }
        var url = this.webServerHost + '/dpo/public/updatePhoneBookContact/';
        this.http.post(url, { 'Contact': Data }, {})
            .then(function (data) {
            var res = JSON.parse(data.data);
            alert('บันทึกสำเร็จ');
            _this.NewPinID = '';
            _this.ConfirmPinID = '';
            // this.Data = res.data.DATA;
            // console.log(JSON.stringify(this.Data));
        })
            .catch(function (error) {
            console.log(error.status);
            console.log(error.error); // error message as string
            console.log(error.headers);
        });
    };
    UserProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-user-profile',template:/*ion-inline-start:"/Applications/ionic_apps/DportalApp/src/pages/user-profile/user-profile.html"*/'<div>\n	<ion-row responsive-sm responsive-xs>\n      <ion-col style="text-align: center;">\n    	<h4>แก้ไขข้อมูล</h4>\n    	<br>\n      </ion-col>\n    </ion-row>\n    <ion-row responsive-sm responsive-xs>\n      <ion-item>\n	    <ion-label color="primary">เบอร์โต๊ะ</ion-label>\n	    <ion-input [(ngModel)]="Data.InternalContact"></ion-input>\n	  </ion-item>\n    </ion-row>\n    <ion-row responsive-sm responsive-xs>\n      <ion-item>\n	    <ion-label color="primary">เบอร์โทรศัพท์</ion-label>\n	    <ion-input [(ngModel)]="Data.Tel"></ion-input>\n	  </ion-item>\n    </ion-row>\n    <ion-row responsive-sm responsive-xs>\n      <ion-item>\n	    <ion-label color="primary">แฟกซ์</ion-label>\n	    <ion-input [(ngModel)]="Data.Fax"></ion-input>\n	  </ion-item>\n    </ion-row>\n    <ion-row responsive-sm responsive-xs>\n      <ion-item>\n	    <ion-label color="primary">มือถือ</ion-label>\n	    <ion-input [(ngModel)]="Data.Mobile"></ion-input>\n	  </ion-item>\n    </ion-row>\n    <ion-row responsive-sm responsive-xs>\n      <ion-item>\n      <ion-label color="primary">PIN เดิม</ion-label>\n      <ion-input type="password" [(ngModel)]="Data.PinID" readonly="true"></ion-input>\n    </ion-item>\n    </ion-row>\n    <ion-row responsive-sm responsive-xs>\n      <ion-item>\n      <ion-label color="primary">PIN ใหม่</ion-label>\n      <ion-input type="tel" [(ngModel)]="NewPinID" maxlength="4" max="9999"></ion-input>\n    </ion-item>\n    </ion-row>\n    <ion-row responsive-sm responsive-xs>\n      <ion-item>\n      <ion-label color="primary">ยืนยัน PIN ใหม่</ion-label>\n      <ion-input type="tel" [(ngModel)]="ConfirmPinID" maxlength="4" max="9999"></ion-input>\n    </ion-item>\n    </ion-row>\n    <ion-row responsive-sm responsive-xs>\n    	<ion-col style="text-align: center;">\n	    	<br>\n	    	<br>\n		    <button ion-button round (tap)="saveData(Data)">บันทึก</button>\n		</ion-col>\n    </ion-row>\n    \n	\n</div>\n\n'/*ion-inline-end:"/Applications/ionic_apps/DportalApp/src/pages/user-profile/user-profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__["a" /* HTTP */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], UserProfilePage);
    return UserProfilePage;
}());

//# sourceMappingURL=user-profile.js.map

/***/ }),

/***/ 214:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(237);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 237:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_news_news__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_news_detail_news_detail__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_link_link__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_ex_phone_book_ex_phone_book__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_in_phone_book_in_phone_book__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_repair_repair__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_dashboard_dashboard__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_room_reserve_room_reserve__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_user_profile_user_profile__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_list_list__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_status_bar__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_splash_screen__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_http__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_storage__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_in_app_browser__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_badge__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_call_number__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_push__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_date_picker__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_app_minimize__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_background_mode__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_document_viewer__ = __webpack_require__(158);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






















// import { Geolocation } from '@ionic-native/geolocation';





var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_news_news__["a" /* NewsPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_link_link__["a" /* LinkPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_ex_phone_book_ex_phone_book__["a" /* ExPhoneBookPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_in_phone_book_in_phone_book__["a" /* InPhoneBookPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_repair_repair__["a" /* RepairPage */],
                // CarPage,
                __WEBPACK_IMPORTED_MODULE_13__pages_user_profile_user_profile__["a" /* UserProfilePage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_room_reserve_room_reserve__["a" /* RoomReservePage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_dashboard_dashboard__["a" /* DashboardPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_news_detail_news_detail__["a" /* NewsDetailPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_list_list__["a" /* ListPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/dashboard/dashboard.module#DashboardPageModule', name: 'DashboardPage', segment: 'dashboard', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/car/car.module#CarPageModule', name: 'CarPage', segment: 'car', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/in-phone-book/in-phone-book.module#InPhoneBookPageModule', name: 'InPhoneBookPage', segment: 'in-phone-book', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/link/link.module#LinkPageModule', name: 'LinkPage', segment: 'link', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/ex-phone-book/ex-phone-book.module#ExPhoneBookPageModule', name: 'ExPhoneBookPage', segment: 'ex-phone-book', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/news-detail/news-detail.module#NewsDetailPageModule', name: 'NewsDetailPage', segment: 'news-detail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/repair/repair.module#RepairPageModule', name: 'RepairPage', segment: 'repair', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/news/news.module#NewsPageModule', name: 'NewsPage', segment: 'news', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/room-reserve/room-reserve.module#RoomReservePageModule', name: 'RoomReservePage', segment: 'room-reserve', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/user-profile/user-profile.module#UserProfilePageModule', name: 'UserProfilePage', segment: 'user-profile', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_18__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_news_news__["a" /* NewsPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_link_link__["a" /* LinkPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_ex_phone_book_ex_phone_book__["a" /* ExPhoneBookPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_in_phone_book_in_phone_book__["a" /* InPhoneBookPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_repair_repair__["a" /* RepairPage */],
                // CarPage,
                __WEBPACK_IMPORTED_MODULE_13__pages_user_profile_user_profile__["a" /* UserProfilePage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_room_reserve_room_reserve__["a" /* RoomReservePage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_dashboard_dashboard__["a" /* DashboardPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_news_detail_news_detail__["a" /* NewsDetailPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_list_list__["a" /* ListPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_http__["a" /* HTTP */],
                __WEBPACK_IMPORTED_MODULE_19__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_badge__["a" /* Badge */],
                __WEBPACK_IMPORTED_MODULE_21__ionic_native_call_number__["a" /* CallNumber */]
                // ,Geolocation
                ,
                __WEBPACK_IMPORTED_MODULE_22__ionic_native_push__["a" /* Push */],
                __WEBPACK_IMPORTED_MODULE_23__ionic_native_date_picker__["a" /* DatePicker */],
                __WEBPACK_IMPORTED_MODULE_24__ionic_native_app_minimize__["a" /* AppMinimize */],
                __WEBPACK_IMPORTED_MODULE_25__ionic_native_background_mode__["a" /* BackgroundMode */],
                __WEBPACK_IMPORTED_MODULE_26__ionic_native_document_viewer__["a" /* DocumentViewer */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_browser__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(199);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, storage, iab) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.storage = storage;
        this.iab = iab;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */];
        this.LoginObj = {};
        this.webServerHost = 'https://dportal.dpo.go.th'; //'http://127.0.0.1/dportal'
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            // { title: 'ข่าวประชาสัมพันธ์', url: 'news' },
            // { title: 'ลิ้งค์ที่เกี่ยวข้อง', url: 'link' },
            { title: 'สมุดโทรศัพท์ภายใน', url: 'telephonebook_internal' },
            { title: 'สมุดโทรศัพท์ภายนอก', url: 'telephonebook_external' },
            { title: 'MIS', url: 'MIS' },
            { title: 'ข้อมูลส่วนตัว', url: 'user_profile' }
        ];
        storage.get('LoginObj').then(function (val) {
            if (val != null && val != '') {
                _this.LoginObj = JSON.parse(val);
            }
        });
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (pageType) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        if (pageType == 'MIS') {
            this.openWeb(this.webServerHost + '/' + pageType);
        }
        else {
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */], { pageType: pageType, 'loggedin': true });
        }
    };
    MyApp.prototype.openWeb = function (url) {
        var openurl = url;
        console.log(openurl);
        // url = url + '/'+ (JSON.stringify(this.LoginObj));
        var browser = this.iab.create(openurl, '_blank', { location: 'yes', 'clearcache': 'yes' });
        browser.on('loaderror').subscribe(function (loadError) {
            console.log(loadError);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Applications/ionic_apps/DportalApp/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title ><span style="color:#FFF;">Menu</span></ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content class="my-container">\n    <ion-list style="background: transparent;">\n      <button  menuClose ion-item *ngFor="let p of pages" (click)="openPage(p.url)"  style="background: transparent; color: #FFF;">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/Applications/ionic_apps/DportalApp/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_browser__["a" /* InAppBrowser */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ListPage = /** @class */ (function () {
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        for (var i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    ListPage_1 = ListPage;
    ListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ListPage_1, {
            item: item
        });
    };
    ListPage = ListPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list',template:/*ion-inline-start:"/Applications/ionic_apps/DportalApp/src/pages/list/list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>List</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n      <ion-icon [name]="item.icon" item-start></ion-icon>\n      {{item.title}}\n      <div class="item-note" item-end>\n        {{item.note}}\n      </div>\n    </button>\n  </ion-list>\n  <div *ngIf="selectedItem" padding>\n    You navigated here from <b>{{selectedItem.title}}</b>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Applications/ionic_apps/DportalApp/src/pages/list/list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
    ], ListPage);
    return ListPage;
    var ListPage_1;
}());

//# sourceMappingURL=list.js.map

/***/ })

},[214]);
//# sourceMappingURL=main.js.map