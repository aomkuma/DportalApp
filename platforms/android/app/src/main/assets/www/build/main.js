webpackJsonp([7],{

/***/ 113:
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
webpackEmptyAsyncContext.id = 113;

/***/ }),

/***/ 154:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/car/car.module": [
		285,
		6
	],
	"../pages/ex-phone-book/ex-phone-book.module": [
		282,
		5
	],
	"../pages/in-phone-book/in-phone-book.module": [
		283,
		4
	],
	"../pages/link/link.module": [
		284,
		3
	],
	"../pages/news/news.module": [
		287,
		2
	],
	"../pages/repair/repair.module": [
		288,
		1
	],
	"../pages/user-profile/user-profile.module": [
		286,
		0
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
webpackAsyncContext.id = 154;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_http__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_browser__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_badge__ = __webpack_require__(198);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, navParams, http, storage, iab, sanitizer, badge, statusBar) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.storage = storage;
        this.iab = iab;
        this.sanitizer = sanitizer;
        this.badge = badge;
        this.statusBar = statusBar;
        this.pageType = null;
        this.LoginPage = 'LOGIN';
        this.webServerHost = 'https://dportal.dpo.go.th'; //'http://127.0.0.1/dportal'
        this.User = { 'Username': 'test@dpo.go.th', 'Password': 'P@ssw0rd' };
        this.LoginObj = {};
        this.ShowNotify = false;
        this.SearchList = [];
        this.NotificationList = [];
        this.UnseenNotify = 0;
        this.keyword = '';
        // this.storage.remove('LoginObj');
        this.statusBar.overlaysWebView(true);
        this.statusBar.show();
        this.statusBar.backgroundColorByHexString('#AB2323');
        this.pageType = this.navParams.get("pageType");
        console.log('PAGE TYPE = ' + this.pageType);
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
                    this.getNotifications();
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
                        setInterval(function () {
                            this.getNotifications();
                        }, 360000);
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
            console.log(data.data);
            var res = JSON.parse(data.data);
            if (res.data.STATUS == 'OK') {
                _this.LoginObj = res.data.DATA.UserData;
                _this.setPageType('news');
                _this.getNotifications();
                setInterval(function () {
                    this.getNotifications();
                }, 360000);
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
                setInterval(function () {
                    this.getNotifications();
                }, 360000);
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
    HomePage.prototype.openWeb = function (url) {
        var openurl = this.webServerHost + '/mobile/' + url + '//' + btoa((encodeURIComponent(JSON.stringify(this.LoginObj)))); // + (JSON.stringify(this.LoginObj));
        console.log(openurl);
        // url = url + '/'+ (JSON.stringify(this.LoginObj));
        var browser = this.iab.create(openurl, '_blank', { location: 'yes', 'clearcache': 'yes' });
        browser.on('loaderror').subscribe(function (loadError) {
            console.log(loadError);
        });
    };
    HomePage.prototype.openWebExternal = function (url) {
        console.log(url);
        // url = url + '/'+ (JSON.stringify(this.LoginObj));
        var browser = this.iab.create(url, '_blank', { location: 'yes', 'clearcache': 'yes' });
        browser.on('loaderror').subscribe(function (loadError) {
            console.log(loadError);
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
            console.log(JSON.stringify(res));
            if (res.data.STATUS == 'OK') {
                _this.SearchList = res.data.DATA.NewsList;
                _this.setPageType('search');
                _this.errorMsg = '';
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
            console.log(res);
            if (res.data.STATUS == 'OK') {
                _this.NotificationList = res.data.DATA.NotificationList;
                _this.UnseenNotify = res.data.DATA.totalNewNotifications;
                _this.badge.set(_this.UnseenNotify);
                // this.setPageType('search');
                console.log(JSON.stringify(_this.NotificationList));
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
    HomePage.prototype.goUnderContruction = function () {
        alert('Car Reservation Menu Is Unavailable At This Time ! ');
    };
    HomePage.prototype.subStringNews = function (text) {
        return text.substring(0, 150);
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
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"c:\Users\Lenovo\source\repos\DportalApp\src\pages\home\home.html"*/'<ion-header *ngIf="this.pageType != null"  >\n\n  <ion-navbar >\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu" color="light"></ion-icon>\n\n    </button>\n\n\n\n    <ion-title>\n\n      <div style="display: inline-block;">\n\n        <input placeholder="ค้นหา.." style="width: 80%; border: 1px solid #ccc;float: left; height: 33px;" [(ngModel)]="keyword">\n\n        <button style="float: left; background-color: #FFF; height: 33px; border-radius: 5px;" (tap)="searchNews(keyword)" [disabled]="keyword == \'\'">\n\n          <ion-icon name="md-search" color="primary"></ion-icon>\n\n        </button>\n\n      </div>\n\n    </ion-title>\n\n    <ion-buttons end>\n\n      <button ion-button icon-only (tap)="showNotify()" style="color:red; font-weight: bolder;">\n\n        <ion-icon name="md-notifications"  color="light" ></ion-icon> {{UnseenNotify}}\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <!--\n\n  <div style="overflow:auto;-webkit-overflow-scrolling:touch; height: 100%; margin-top: 20%; border: none;"  *ngIf="this.pageType != null">\n\n      \n\n      <iframe style="width:100%;height:100%;" [src]="pageType"></iframe>\n\n  </div>\n\n  -->\n\n  <div *ngIf="this.pageType != null" style=" height: 100%;">\n\n    \n\n    <ion-row responsive-sm responsive-xs>\n\n      <ion-col style="text-align: center;">\n\n        <page-news *ngIf="this.pageType == \'news\'"></page-news>\n\n        \n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row responsive-sm responsive-xs>\n\n      <ion-col style="text-align: center;">\n\n        <page-link *ngIf="this.pageType == \'link\'"></page-link>\n\n        \n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row responsive-sm responsive-xs>\n\n      <ion-col style="text-align: center;">\n\n        <page-in-phone-book *ngIf="this.pageType == \'telephonebook_internal\'"></page-in-phone-book>\n\n        \n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row responsive-sm responsive-xs>\n\n      <ion-col style="text-align: center;">\n\n        <page-ex-phone-book *ngIf="this.pageType == \'telephonebook_external\'"></page-ex-phone-book>\n\n        \n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row responsive-sm responsive-xs>\n\n      <ion-col style="text-align: center;">\n\n        <page-user-profile *ngIf="this.pageType == \'user_profile\'"></page-user-profile>\n\n        \n\n      </ion-col>\n\n    </ion-row>\n\n\n\n    <ion-row responsive-sm responsive-xs *ngIf="this.pageType == \'search\'" style="margin-top: 15%;">\n\n      <ion-col style="text-align: center;">\n\n        <ion-row responsive-sm responsive-xs>\n\n          <ion-col style="text-align: left;">\n\n            <u><h4>ผลลัพธ์การค้นหา</h4></u>\n\n          </ion-col>\n\n        </ion-row>\n\n        <span *ngIf="errorMsg != \'\'"></span>\n\n        <ion-row responsive-sm responsive-xs *ngFor="let data of SearchList">\n\n          <ion-col style="text-align: left;">\n\n            <div [innerHtml]="data.NewsTitle" style="color: #FF5C5C;"></div>\n\n            <div [innerHtml]="subStringNews(data.NewsContent)" style=""></div>\n\n            <hr>\n\n          </ion-col>\n\n        </ion-row>\n\n      </ion-col>\n\n    </ion-row>\n\n  </div>\n\n  <div style="padding-top: 25%;" *ngIf="this.pageType == null && LoginPage == \'PIN-SETTING\'">\n\n    <ion-row responsive-sm responsive-xs>\n\n      <ion-col style="text-align: center;">\n\n        <img src="assets/imgs/user.png" style="height:100%;">\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row responsive-sm responsive-xs>\n\n      <ion-col style="text-align: center;">\n\n        กรุณาระบุ PIN 4 หลัก\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row responsive-sm responsive-xs  >\n\n      <ion-col col-2 offset-2>\n\n        <ion-input [(ngModel)]="Pin1" type="number" autofocus style="border-bottom: 1px solid #999; text-align: center;" max="9" tabindex="1" (keyup)="moveFocus(b)"></ion-input>\n\n      </ion-col>\n\n      <ion-col col-2>\n\n        <ion-input [(ngModel)]="Pin2" type="number" #b style="border-bottom: 1px solid #999; text-align: center;" max="9" tabindex="2" (keyup)="moveFocus(c)"></ion-input>\n\n      </ion-col>\n\n      <ion-col col-2>\n\n        <ion-input [(ngModel)]="Pin3" type="number" #c style="border-bottom: 1px solid #999; text-align: center;" max="9" tabindex="3" (keyup)="moveFocus(d)"></ion-input>\n\n      </ion-col>\n\n      <ion-col col-2>\n\n        <ion-input [(ngModel)]="Pin4" type="number" #d style="border-bottom: 1px solid #999; text-align: center;" max="9" (keyup)="pinSetting(LoginObj.UserID)"></ion-input>\n\n      </ion-col>\n\n    </ion-row>\n\n  </div>\n\n\n\n  <div style="padding-top: 25%;" *ngIf="this.pageType == null && LoginPage == \'PIN-LOGIN\'">\n\n    <ion-row responsive-sm responsive-xs>\n\n      <ion-col style="text-align: center;">\n\n        <img src="assets/imgs/user.png" style="height:100%;">\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row responsive-sm responsive-xs>\n\n      <ion-col style="text-align: center;">\n\n        กรุณาระบุ PIN 4 หลัก\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row responsive-sm responsive-xs  >\n\n      <ion-col col-2 offset-2>\n\n        <ion-input [(ngModel)]="Pin1" type="number" #a autofocus style="border-bottom: 1px solid #999; text-align: center;" max="9" tabindex="1" (keyup)="moveFocus(b)"></ion-input>\n\n      </ion-col>\n\n      <ion-col col-2>\n\n        <ion-input [(ngModel)]="Pin2" type="number" #b style="border-bottom: 1px solid #999; text-align: center;" max="9" tabindex="2" (keyup)="moveFocus(c)"></ion-input>\n\n      </ion-col>\n\n      <ion-col col-2>\n\n        <ion-input [(ngModel)]="Pin3" type="number" #c style="border-bottom: 1px solid #999; text-align: center;" max="9" tabindex="3" (keyup)="moveFocus(d)"></ion-input>\n\n      </ion-col>\n\n      <ion-col col-2>\n\n        <ion-input [(ngModel)]="Pin4" type="number" #d style="border-bottom: 1px solid #999; text-align: center;" max="9" (keyup)="loginWithPin(LoginObj.UserID, a)"></ion-input>\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row responsive-sm responsive-xs *ngIf="errMsg != \'\'">\n\n      <ion-col style="text-align: center;">\n\n        {{errorMsg}}\n\n      </ion-col>\n\n    </ion-row>\n\n  </div>\n\n\n\n  <div style="padding-top: 25%;" *ngIf="this.pageType == null && LoginPage == \'LOGIN\'">\n\n    <ion-row responsive-sm responsive-xs>\n\n      <ion-col style="text-align: center;">\n\n        <img src="assets/imgs/user.png" style="height:100%;">\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row responsive-sm responsive-xs>\n\n      <ion-col col-2 offset-1>\n\n       <img src="assets/imgs/user.png" style="height:30%; margin-top:10px;">\n\n      </ion-col>\n\n      <ion-col col-8>\n\n        <ion-input placeholder="Username" [(ngModel)]="User.Username" style="border-bottom: 1px solid #999;"></ion-input>\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row responsive-sm responsive-xs>\n\n      <ion-col col-2 offset-1>\n\n       <img src="assets/imgs/key.png" style="height:30%; margin-top:10px;">\n\n      </ion-col>\n\n      <ion-col col-8>\n\n        <ion-input type="password" placeholder="Password" [(ngModel)]="User.Password" style="border-bottom: 1px solid #999;"></ion-input>\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row responsive-sm responsive-xs>\n\n      <ion-col style="text-align: center;">\n\n        <img src="assets/imgs/login.png" style="height:30%; margin-top:10px;" (tap)="login(User)">\n\n        \n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row responsive-sm responsive-xs *ngIf="errMsg != \'\'">\n\n      <ion-col style="text-align: center;">\n\n        {{errorMsg}}\n\n      </ion-col>\n\n    </ion-row>\n\n  </div>\n\n\n\n  <ion-content *ngIf="ShowNotify" style="position: absolute; top:11%; left:10%;right: 0px; width: 90%; height: 70%; background-color: #FFF; border:1px solid #999; border-radius: 10px;">\n\n     <ion-row responsive-sm responsive-xs *ngFor="let data of NotificationList" class="notify" [ngClass]="{\'unseen-notify\':data.NotificationStatus == \'Unseen\'}">\n\n      <ion-col style="text-align: left;">\n\n          <a (tap)="openWeb(data.NotificationUrl)">{{data.NotificationText}}</a>\n\n          <br>\n\n          <span style="color:#999;">{{convertDateToFullThaiDateTime(data.PushDateTime)}} น.</span>\n\n          <hr>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-content>\n\n\n\n</ion-content>\n\n<ion-footer style="height:15%; text-align: center; background-color: #FFF;" *ngIf="this.pageType != null">\n\n  <ion-row responsive-sm responsive-xs>\n\n    <ion-col>\n\n      <img src="assets/imgs/room-icon.png" style="height:60%;" (tap)="openWeb(\'/#/roomconference\')">\n\n      <br>\n\n      จองห้องประชุม\n\n    </ion-col>\n\n    <ion-col>\n\n      <img src="assets/imgs/car-icon.png" style="height:60%;" (tap)="goUnderContruction()"><!--openWeb(\'/#/carreservation\')-->\n\n      <br>\n\n      จองรถ\n\n    </ion-col>\n\n    <ion-col>\n\n      <img src="assets/imgs/repair-icon.png" style="height:60%;" (tap)="openWeb(\'/#/repair/\')">\n\n      <br>\n\n      แจ้งซ่อม\n\n    </ion-col>\n\n    <ion-col>\n\n      <img src="assets/imgs/leave-icon.png" style="height:60%;" (tap)="openWebExternal(\'https://LOMS.dpo.go.th\')">\n\n      <br>\n\n      วันลา\n\n    </ion-col>\n\n  </ion-row>\n\n</ion-footer>\n\n'/*ion-inline-end:"c:\Users\Lenovo\source\repos\DportalApp\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_http__["a" /* HTTP */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__["c" /* DomSanitizer */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_badge__["a" /* Badge */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExPhoneBookPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(25);
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
    function ExPhoneBookPage(navCtrl, navParams, http, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.storage = storage;
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
            selector: 'page-ex-phone-book',template:/*ion-inline-start:"c:\Users\Lenovo\source\repos\DportalApp\src\pages\ex-phone-book\ex-phone-book.html"*/'<div style="padding-top: 2%;">\n\n	<ion-row responsive-sm responsive-xs>\n\n      <ion-col style="text-align: center;">\n\n    	<h4>สมุดโทรศัพท์ภายนอก</h4>\n\n    	<br>\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row responsive-sm responsive-xs *ngFor="let data of PhoneList" >\n\n      <ion-col style="text-align: left;">\n\n      	<ion-icon name="md-person"></ion-icon> {{data.FirstName}} {{data.LastName}}\n\n        <br>\n\n        <ion-icon name="md-phone-portrait"></ion-icon> {{data.Tel}}\n\n    	<br>\n\n    	<hr>\n\n      </ion-col>\n\n    </ion-row>\n\n    \n\n	\n\n</div>\n\n\n\n'/*ion-inline-end:"c:\Users\Lenovo\source\repos\DportalApp\src\pages\ex-phone-book\ex-phone-book.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__["a" /* HTTP */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], ExPhoneBookPage);
    return ExPhoneBookPage;
}());

//# sourceMappingURL=ex-phone-book.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InPhoneBookPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(25);
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
    function InPhoneBookPage(navCtrl, navParams, http, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.storage = storage;
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
            selector: 'page-in-phone-book',template:/*ion-inline-start:"c:\Users\Lenovo\source\repos\DportalApp\src\pages\in-phone-book\in-phone-book.html"*/'<div style="padding-top: 2%;">\n\n	<ion-row responsive-sm responsive-xs>\n\n      <ion-col style="text-align: center;">\n\n    	<h4>สมุดโทรศัพท์ภายใน</h4>\n\n    	<br>\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row responsive-sm responsive-xs *ngFor="let data of PhoneList" >\n\n      <ion-col style="text-align: left;">\n\n      	<ion-icon name="md-person"></ion-icon> {{data.FirstName}} {{data.LastName}}\n\n      	<br>\n\n      	<ion-icon name="md-phone-portrait"></ion-icon> {{data.Tel}}\n\n    	<br>\n\n    	<hr>\n\n      </ion-col>\n\n    </ion-row>\n\n    \n\n	\n\n</div>\n\n\n\n'/*ion-inline-end:"c:\Users\Lenovo\source\repos\DportalApp\src\pages\in-phone-book\in-phone-book.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__["a" /* HTTP */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], InPhoneBookPage);
    return InPhoneBookPage;
}());

//# sourceMappingURL=in-phone-book.js.map

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LinkPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__ = __webpack_require__(49);
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
            selector: 'page-link',template:/*ion-inline-start:"c:\Users\Lenovo\source\repos\DportalApp\src\pages\link\link.html"*/'<div style="padding-top: 2%;">\n\n	<ion-row responsive-sm responsive-xs>\n\n      <ion-col style="text-align: center;">\n\n    	<h4>ลิ้งค์ที่เกี่ยวข้อง</h4>\n\n    	<br>\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row responsive-sm responsive-xs *ngFor="let data of LinkList" >\n\n      <ion-col style="text-align: center;">\n\n      	<a (tap)="openWeb(data.LinkUrl)">\n\n	      	<img src="{{webServerHost + \'/\' + data.LinkIcon}}" alt="ไม่มีรูป" style="height: 80px; width: auto;">\n\n	    	<div [innerHtml]="data.LinkTopic"></div>\n\n	    </a>\n\n    	<br>\n\n    	<hr>\n\n      </ion-col>\n\n    </ion-row>\n\n    \n\n	\n\n</div>\n\n\n\n\n\n'/*ion-inline-end:"c:\Users\Lenovo\source\repos\DportalApp\src\pages\link\link.html"*/,
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

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CarPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
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
 * Generated class for the CarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CarPage = /** @class */ (function () {
    function CarPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    CarPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CarPage');
    };
    CarPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-car',template:/*ion-inline-start:"c:\Users\Lenovo\source\repos\DportalApp\src\pages\car\car.html"*/'<!--\n\n  Generated template for the CarPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Car</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"c:\Users\Lenovo\source\repos\DportalApp\src\pages\car\car.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
    ], CarPage);
    return CarPage;
}());

//# sourceMappingURL=car.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(25);
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
        var url = this.webServerHost + '/dpo/public/updatePhoneBookContact/';
        this.http.post(url, { 'Contact': Data }, {})
            .then(function (data) {
            var res = JSON.parse(data.data);
            alert('บันทึกสำเร็จ');
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
            selector: 'page-user-profile',template:/*ion-inline-start:"c:\Users\Lenovo\source\repos\DportalApp\src\pages\user-profile\user-profile.html"*/'<div style="padding-top: 2%;">\n\n	<ion-row responsive-sm responsive-xs>\n\n      <ion-col style="text-align: center;">\n\n    	<h4>แก้ไขข้อมูล</h4>\n\n    	<br>\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row responsive-sm responsive-xs>\n\n      <ion-item>\n\n	    <ion-label color="primary">เบอร์โต๊ะ</ion-label>\n\n	    <ion-input [(ngModel)]="Data.InternalContact"></ion-input>\n\n	  </ion-item>\n\n    </ion-row>\n\n    <ion-row responsive-sm responsive-xs>\n\n      <ion-item>\n\n	    <ion-label color="primary">เบอร์โทรศัพท์</ion-label>\n\n	    <ion-input [(ngModel)]="Data.Tel"></ion-input>\n\n	  </ion-item>\n\n    </ion-row>\n\n    <ion-row responsive-sm responsive-xs>\n\n      <ion-item>\n\n	    <ion-label color="primary">แฟกซ์</ion-label>\n\n	    <ion-input [(ngModel)]="Data.Fax"></ion-input>\n\n	  </ion-item>\n\n    </ion-row>\n\n    <ion-row responsive-sm responsive-xs>\n\n      <ion-item>\n\n	    <ion-label color="primary">มือถือ</ion-label>\n\n	    <ion-input [(ngModel)]="Data.Mobile"></ion-input>\n\n	  </ion-item>\n\n    </ion-row>\n\n    <ion-row responsive-sm responsive-xs>\n\n    	<ion-col style="text-align: center;">\n\n	    	<br>\n\n	    	<br>\n\n		    <button ion-button round (tap)="saveData(Data)">บันทึก</button>\n\n		</ion-col>\n\n    </ion-row>\n\n    \n\n	\n\n</div>\n\n\n\n'/*ion-inline-end:"c:\Users\Lenovo\source\repos\DportalApp\src\pages\user-profile\user-profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__["a" /* HTTP */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], UserProfilePage);
    return UserProfilePage;
}());

//# sourceMappingURL=user-profile.js.map

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(25);
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
    function NewsPage(navCtrl, navParams, http, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.storage = storage;
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
        var url = this.webServerHost + "/dpo/public/getNewsListView/" + this.offset + "/0";
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
            selector: 'page-news',template:/*ion-inline-start:"c:\Users\Lenovo\source\repos\DportalApp\src\pages\news\news.html"*/'<!--\n\n  Generated template for the NewsPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n\n\n<div style="padding-top: 2%;">\n\n	<ion-row responsive-sm responsive-xs>\n\n      <ion-col style="text-align: center;">\n\n    	<h4>ข่าวประชาสัมพันธ์</h4>\n\n    	<br>\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row responsive-sm responsive-xs *ngFor="let data of NewsList" >\n\n      <ion-col style="text-align: center;">\n\n      	<img src="{{webServerHost + \'/\' + data.NewsPicture}}">\n\n    	<div [innerHtml]="data.NewsTitle"></div>\n\n      <span style="text-align: right; color:#999;">{{convertDateToFullThaiDateIgnoreTime(data.NewsDateTime)}}</span>\n\n    	<br>\n\n    	<hr>\n\n      </ion-col>\n\n      \n\n    </ion-row>\n\n    \n\n	\n\n</div>\n\n'/*ion-inline-end:"c:\Users\Lenovo\source\repos\DportalApp\src\pages\news\news.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__["a" /* HTTP */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], NewsPage);
    return NewsPage;
}());

//# sourceMappingURL=news.js.map

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RepairPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
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
            selector: 'page-repair',template:/*ion-inline-start:"c:\Users\Lenovo\source\repos\DportalApp\src\pages\repair\repair.html"*/'<!--\n\n  Generated template for the RepairPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Repair</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"c:\Users\Lenovo\source\repos\DportalApp\src\pages\repair\repair.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
    ], RepairPage);
    return RepairPage;
}());

//# sourceMappingURL=repair.js.map

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(229);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 229:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_news_news__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_link_link__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_ex_phone_book_ex_phone_book__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_in_phone_book_in_phone_book__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_repair_repair__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_car_car__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_user_profile_user_profile__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_list_list__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_status_bar__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_splash_screen__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_http__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_storage__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_in_app_browser__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_badge__ = __webpack_require__(198);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_news_news__["a" /* NewsPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_link_link__["a" /* LinkPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_ex_phone_book_ex_phone_book__["a" /* ExPhoneBookPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_in_phone_book_in_phone_book__["a" /* InPhoneBookPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_repair_repair__["a" /* RepairPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_car_car__["a" /* CarPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_user_profile_user_profile__["a" /* UserProfilePage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_list_list__["a" /* ListPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/ex-phone-book/ex-phone-book.module#ExPhoneBookPageModule', name: 'ExPhoneBookPage', segment: 'ex-phone-book', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/in-phone-book/in-phone-book.module#InPhoneBookPageModule', name: 'InPhoneBookPage', segment: 'in-phone-book', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/link/link.module#LinkPageModule', name: 'LinkPage', segment: 'link', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/car/car.module#CarPageModule', name: 'CarPage', segment: 'car', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/user-profile/user-profile.module#UserProfilePageModule', name: 'UserProfilePage', segment: 'user-profile', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/news/news.module#NewsPageModule', name: 'NewsPage', segment: 'news', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/repair/repair.module#RepairPageModule', name: 'RepairPage', segment: 'repair', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_16__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_news_news__["a" /* NewsPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_link_link__["a" /* LinkPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_ex_phone_book_ex_phone_book__["a" /* ExPhoneBookPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_in_phone_book_in_phone_book__["a" /* InPhoneBookPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_repair_repair__["a" /* RepairPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_car_car__["a" /* CarPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_user_profile_user_profile__["a" /* UserProfilePage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_list_list__["a" /* ListPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_http__["a" /* HTTP */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_18__ionic_native_badge__["a" /* Badge */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_browser__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(197);
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
            { title: 'ข่าวประชาสัมพันธ์', url: 'news' },
            { title: 'ลิ้งค์ที่เกี่ยวข้อง', url: 'link' },
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"c:\Users\Lenovo\source\repos\DportalApp\src\app\app.html"*/'<ion-menu [content]="content">\n\n  <ion-header>\n\n    <ion-toolbar>\n\n      <ion-title ><span style="color:#FFF;">Menu</span></ion-title>\n\n    </ion-toolbar>\n\n  </ion-header>\n\n\n\n  <ion-content class="my-container">\n\n    <ion-list style="background: transparent;">\n\n      <button  menuClose ion-item *ngFor="let p of pages" (click)="openPage(p.url)"  style="background: transparent; color: #FFF;">\n\n        {{p.title}}\n\n      </button>\n\n    </ion-list>\n\n  </ion-content>\n\n\n\n</ion-menu>\n\n\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"c:\Users\Lenovo\source\repos\DportalApp\src\app\app.html"*/
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

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
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
            selector: 'page-list',template:/*ion-inline-start:"c:\Users\Lenovo\source\repos\DportalApp\src\pages\list\list.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>List</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-list>\n\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n\n      <ion-icon [name]="item.icon" item-start></ion-icon>\n\n      {{item.title}}\n\n      <div class="item-note" item-end>\n\n        {{item.note}}\n\n      </div>\n\n    </button>\n\n  </ion-list>\n\n  <div *ngIf="selectedItem" padding>\n\n    You navigated here from <b>{{selectedItem.title}}</b>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"c:\Users\Lenovo\source\repos\DportalApp\src\pages\list\list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
    ], ListPage);
    return ListPage;
    var ListPage_1;
}());

//# sourceMappingURL=list.js.map

/***/ })

},[206]);
//# sourceMappingURL=main.js.map