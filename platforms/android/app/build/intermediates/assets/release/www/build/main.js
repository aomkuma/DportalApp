webpackJsonp([0],{

/***/ 111:
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
webpackEmptyAsyncContext.id = 111;

/***/ }),

/***/ 152:
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
webpackEmptyAsyncContext.id = 152;

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__ = __webpack_require__(25);
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
    function HomePage(navCtrl, navParams, http, storage, iab, sanitizer) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.storage = storage;
        this.iab = iab;
        this.sanitizer = sanitizer;
        this.pageType = null;
        this.LoginPage = 'LOGIN';
        this.webServerHost = 'https://dportal.dpo.go.th'; //'http://127.0.0.1/dportal'
        this.User = { 'Username': '', 'Password': '' };
        this.LoginObj = {};
        // this.storage.remove('LoginObj');
        this.pageType = this.navParams.get("pageType");
        console.log('PAGE TYPE = ' + this.pageType);
        console.log(this.pageType);
        storage.get('LoginObj').then(function (val) {
            console.log('Your age is ', val);
            if (val != null && val != '') {
                _this.LoginObj = JSON.parse(val);
                console.log(_this.LoginObj.UserID);
                _this.LoginPage = 'PIN-LOGIN';
                if (_this.pageType != undefined && _this.pageType != null) {
                    var encode = (JSON.stringify(_this.LoginObj));
                    _this.pageType = _this.webServerHost + '/mobile/#/' + _this.pageType; // + '/' + encode;
                    _this.pageType = _this.sanitizer.bypassSecurityTrustResourceUrl(_this.pageType);
                    console.log(_this.pageType);
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
            console.log(User.Username, User.Password);
            // console.log(this.webServerHost + '/dpo/public/login/');
            this.http.post(this.webServerHost + '/dpo/public/login/', { 'obj_login': JSON.stringify(User) }, {})
                .then(function (data) {
                console.log(data.data);
                var res = JSON.parse(data.data);
                if (res.data.STATUS == 'OK') {
                    _this.LoginObj = res.data.DATA.UserData;
                    if (_this.LoginObj.PinID == undefined || _this.LoginObj.PinID == null || _this.LoginObj.PinID == '') {
                        _this.LoginPage = 'PIN-SETTING';
                    }
                    else {
                        _this.storage.set('LoginObj', JSON.stringify(_this.LoginObj));
                        _this.setPageType('news');
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
        this.http.post(this.webServerHost + '/dpo/public/login/pin/', { 'obj_login': params }, {})
            .then(function (data) {
            console.log(data.data);
            var res = JSON.parse(data.data);
            if (res.data.STATUS == 'OK') {
                _this.LoginObj = res.data.DATA.UserData;
                _this.setPageType('news');
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
        this.http.post(this.webServerHost + '/dpo/public/login/pin/setting/', { 'obj_setting': params }, {})
            .then(function (data) {
            var res = JSON.parse(data.data);
            if (res.data.STATUS == 'OK') {
                _this.LoginObj = res.data.DATA.UserData;
                _this.setPageType('news');
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
        var encode = btoa((encodeURIComponent(JSON.stringify(this.LoginObj))));
        this.pageType = this.webServerHost + '/mobile/#/' + page + '/' + encode;
        console.log(this.pageType);
        this.pageType = this.sanitizer.bypassSecurityTrustResourceUrl(this.pageType);
        // alert(this.pageType);
    };
    HomePage.prototype.openWeb = function (url) {
        var openurl = url + '/' + btoa((encodeURIComponent(JSON.stringify(this.LoginObj)))); // + (JSON.stringify(this.LoginObj));
        console.log(openurl);
        // url = url + '/'+ (JSON.stringify(this.LoginObj));
        var browser = this.iab.create(openurl, '_blank', { location: 'yes', 'clearcache': 'yes' });
        browser.on('loaderror').subscribe(function (loadError) {
            console.log(loadError);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('a'),
        __metadata("design:type", Object)
    ], HomePage.prototype, "myInput", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"c:\Users\Lenovo\source\repos\DportalApp\src\pages\home\home.html"*/'<ion-header *ngIf="this.pageType != null"  >\n\n  <ion-navbar >\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Home</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  \n\n  <div style="overflow:auto;-webkit-overflow-scrolling:touch; height: 100%; margin-top: 20%; border: none;"  *ngIf="this.pageType != null">\n\n      \n\n      <iframe style="width:100%;height:100%;" [src]="pageType"></iframe>\n\n  </div>\n\n\n\n  <div style="padding-top: 25%;" *ngIf="this.pageType == null && LoginPage == \'PIN-SETTING\'">\n\n    <ion-row responsive-sm responsive-xs>\n\n      <ion-col style="text-align: center;">\n\n        <img src="assets/imgs/user.png" style="height:100%;">\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row responsive-sm responsive-xs>\n\n      <ion-col style="text-align: center;">\n\n        กรุณาระบุ PIN 4 หลัก\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row responsive-sm responsive-xs  >\n\n      <ion-col col-2 offset-2>\n\n        <ion-input [(ngModel)]="Pin1" type="number" autofocus style="border-bottom: 1px solid #999; text-align: center;" max="9" tabindex="1" (keyup)="moveFocus(b)"></ion-input>\n\n      </ion-col>\n\n      <ion-col col-2>\n\n        <ion-input [(ngModel)]="Pin2" type="number" #b style="border-bottom: 1px solid #999; text-align: center;" max="9" tabindex="2" (keyup)="moveFocus(c)"></ion-input>\n\n      </ion-col>\n\n      <ion-col col-2>\n\n        <ion-input [(ngModel)]="Pin3" type="number" #c style="border-bottom: 1px solid #999; text-align: center;" max="9" tabindex="3" (keyup)="moveFocus(d)"></ion-input>\n\n      </ion-col>\n\n      <ion-col col-2>\n\n        <ion-input [(ngModel)]="Pin4" type="number" #d style="border-bottom: 1px solid #999; text-align: center;" max="9" (keyup)="pinSetting(LoginObj.UserID)"></ion-input>\n\n      </ion-col>\n\n    </ion-row>\n\n  </div>\n\n\n\n  <div style="padding-top: 25%;" *ngIf="this.pageType == null && LoginPage == \'PIN-LOGIN\'">\n\n    <ion-row responsive-sm responsive-xs>\n\n      <ion-col style="text-align: center;">\n\n        <img src="assets/imgs/user.png" style="height:100%;">\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row responsive-sm responsive-xs>\n\n      <ion-col style="text-align: center;">\n\n        กรุณาระบุ PIN 4 หลัก\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row responsive-sm responsive-xs  >\n\n      <ion-col col-2 offset-2>\n\n        <ion-input [(ngModel)]="Pin1" type="number" #a autofocus style="border-bottom: 1px solid #999; text-align: center;" max="9" tabindex="1" (keyup)="moveFocus(b)"></ion-input>\n\n      </ion-col>\n\n      <ion-col col-2>\n\n        <ion-input [(ngModel)]="Pin2" type="number" #b style="border-bottom: 1px solid #999; text-align: center;" max="9" tabindex="2" (keyup)="moveFocus(c)"></ion-input>\n\n      </ion-col>\n\n      <ion-col col-2>\n\n        <ion-input [(ngModel)]="Pin3" type="number" #c style="border-bottom: 1px solid #999; text-align: center;" max="9" tabindex="3" (keyup)="moveFocus(d)"></ion-input>\n\n      </ion-col>\n\n      <ion-col col-2>\n\n        <ion-input [(ngModel)]="Pin4" type="number" #d style="border-bottom: 1px solid #999; text-align: center;" max="9" (keyup)="loginWithPin(LoginObj.UserID, a)"></ion-input>\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row responsive-sm responsive-xs *ngIf="errMsg != \'\'">\n\n      <ion-col style="text-align: center;">\n\n        {{errorMsg}}\n\n      </ion-col>\n\n    </ion-row>\n\n  </div>\n\n\n\n  <div style="padding-top: 25%;" *ngIf="this.pageType == null && LoginPage == \'LOGIN\'">\n\n    <ion-row responsive-sm responsive-xs>\n\n      <ion-col style="text-align: center;">\n\n        <img src="assets/imgs/user.png" style="height:100%;">\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row responsive-sm responsive-xs>\n\n      <ion-col col-2 offset-1>\n\n       <img src="assets/imgs/user.png" style="height:30%; margin-top:10px;">\n\n      </ion-col>\n\n      <ion-col col-8>\n\n        <ion-input placeholder="Username" [(ngModel)]="User.Username" style="border-bottom: 1px solid #999;"></ion-input>\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row responsive-sm responsive-xs>\n\n      <ion-col col-2 offset-1>\n\n       <img src="assets/imgs/key.png" style="height:30%; margin-top:10px;">\n\n      </ion-col>\n\n      <ion-col col-8>\n\n        <ion-input type="password" placeholder="Password" [(ngModel)]="User.Password" style="border-bottom: 1px solid #999;"></ion-input>\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row responsive-sm responsive-xs>\n\n      <ion-col style="text-align: center;">\n\n        <img src="assets/imgs/login.png" style="height:30%; margin-top:10px;" (tap)="login(User)">\n\n        \n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row responsive-sm responsive-xs *ngIf="errMsg != \'\'">\n\n      <ion-col style="text-align: center;">\n\n        {{errorMsg}}\n\n      </ion-col>\n\n    </ion-row>\n\n  </div>\n\n\n\n</ion-content>\n\n<ion-footer style="height:15%; text-align: center; background-color: #FFF;" *ngIf="this.pageType != null">\n\n  <ion-row responsive-sm responsive-xs>\n\n    <ion-col>\n\n      <img src="assets/imgs/room-icon.png" style="height:60%;" (tap)="openWeb(webServerHost + \'/mobile/#/roomconference\')">\n\n      <br>\n\n      จองห้องประชุม\n\n    </ion-col>\n\n    <ion-col>\n\n      <img src="assets/imgs/car-icon.png" style="height:60%;" (tap)="openWeb(webServerHost + \'/mobile/#/news\')">\n\n      <br>\n\n      จองรถ\n\n    </ion-col>\n\n    <ion-col>\n\n      <img src="assets/imgs/repair-icon.png" style="height:60%;" (tap)="openWeb(webServerHost + \'/mobile/#/repair/\')">\n\n      <br>\n\n      แจ้งซ่อม\n\n    </ion-col>\n\n    <ion-col>\n\n      <img src="assets/imgs/leave-icon.png" style="height:60%;" (tap)="openWeb(webServerHost + \'mobile/#/roomconference\')">\n\n      <br>\n\n      วันลา\n\n    </ion-col>\n\n  </ion-row>\n\n</ion-footer>\n\n'/*ion-inline-end:"c:\Users\Lenovo\source\repos\DportalApp\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__["a" /* HTTP */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__["c" /* DomSanitizer */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(221);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_list_list__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_http__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_in_app_browser__ = __webpack_require__(102);
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
                __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_http__["a" /* HTTP */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_in_app_browser__["a" /* InAppBrowser */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 264:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_browser__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(196);
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
            { title: 'ข่าวประชาสัมพันธ์', url: '/mobile/#/news' },
            { title: 'ลิ้งค์ที่เกี่ยวข้อง', url: '/mobile/#/link' },
            { title: 'สมุดโทรศัพท์ภายใน', url: '/mobile/#/telephonebook_internal' },
            { title: 'สมุดโทรศัพท์ภายนอก', url: '/mobile/#/telephonebook_external' },
            { title: 'MIS', url: '/MIS' },
            { title: 'ข้อมูลส่วนตัว', url: '/mobile/#/user_profile' }
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
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */], { pageType: pageType });
    };
    MyApp.prototype.openWeb = function (url) {
        var openurl = url + '/' + btoa((encodeURIComponent(JSON.stringify(this.LoginObj)))); // + (JSON.stringify(this.LoginObj));
        console.log(openurl);
        // url = url + '/'+ (JSON.stringify(this.LoginObj));
        var browser = this.iab.create(openurl, '_blank', { location: 'yes', 'clearcache': 'yes' });
        browser.on('loaderror').subscribe(function (loadError) {
            console.log(loadError);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"c:\Users\Lenovo\source\repos\DportalApp\src\app\app.html"*/'<ion-menu [content]="content">\n\n  <ion-header>\n\n    <ion-toolbar>\n\n      <ion-title>Menu</ion-title>\n\n    </ion-toolbar>\n\n  </ion-header>\n\n\n\n  <ion-content style="background-color: #01a3a4;">\n\n    <ion-list style="background-color: #01a3a4;">\n\n      <button  style="background-color: #01a3a4;" menuClose ion-item *ngFor="let p of pages" (click)="openWeb(webServerHost + p.url)">\n\n        {{p.title}}\n\n      </button>\n\n    </ion-list>\n\n  </ion-content>\n\n\n\n</ion-menu>\n\n\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"c:\Users\Lenovo\source\repos\DportalApp\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_browser__["a" /* InAppBrowser */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 273:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(40);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]])
    ], ListPage);
    return ListPage;
    var ListPage_1;
}());

//# sourceMappingURL=list.js.map

/***/ })

},[198]);
//# sourceMappingURL=main.js.map