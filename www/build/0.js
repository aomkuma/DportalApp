webpackJsonp([0],{

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CarPageModule", function() { return CarPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__car__ = __webpack_require__(299);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CarPageModule = /** @class */ (function () {
    function CarPageModule() {
    }
    CarPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__car__["a" /* CarPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__car__["a" /* CarPage */]),
            ],
        })
    ], CarPageModule);
    return CarPageModule;
}());

//# sourceMappingURL=car.module.js.map

/***/ }),

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CarPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_date_picker__ = __webpack_require__(212);
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
    function CarPage(navCtrl, navParams, datePicker) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.datePicker = datePicker;
    }
    CarPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CarPage');
    };
    CarPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-car',template:/*ion-inline-start:"/Applications/ionic_apps/DportalApp/src/pages/car/car.html"*/'\n<!--<div>\n	<ion-row responsive-sm responsive-xs>\n      <ion-col style="text-align: center;">\n    	<h4>รายละเอียดการจองพาหนะ</h4>\n    	<br>\n      </ion-col>\n    </ion-row>\n	<div class="row">\n		<div class="col-lg-5" *ngIf="CarDetail != undefined">\n	        <div class="row form-group">\n	            <div class="col-lg-12">\n	    		  <img src="{{CarDetail.CarPicture}}" border="0" style=" border:#999 1px solid; max-width: 100%;">\n	            </div>\n	        </div>\n	        <div class="row ">\n	            <label class="col-lg-4 form-control-static">อ.ส.ค.พื้นท ี่ : </label>\n	            <label class="col-lg-8 form-control-static text-thin">{{ReserveCarInfo.RegionName}}</label>\n	        </div>\n	        <div class="row ">\n	            <label class="col-lg-4 form-control-static">ประเภทรถ : </label>\n	            <label class="col-lg-8 form-control-static text-thin">{{CarDetail.CarType}}</label>\n	        </div>\n	        <div class="row ">\n	            <label class="col-lg-4 form-control-static">ยี่ห้อ : </label>\n	            <label class="col-lg-3 form-control-static text-thin">{{CarDetail.Brand}}</label>\n	            <label class="col-lg-1 form-control-static">รุ่น</label>\n	            <label class="col-lg-4 form-control-static text-thin">{{CarDetail.Model}}</label>\n	        </div>\n	        <div class="row ">\n	            <label class="col-lg-4 form-control-static">ทะเบียนรถ : </label>\n	            <label class="col-lg-8 form-control-static text-thin">{{CarDetail.License }}&nbsp;{{CarDetail.LicenseProvinceName }}</label>\n	        </div>\n	        <div class="row ">\n	            <label class="col-lg-4 form-control-static">จำนวนที่นั่ง : </label>\n	            <label class="col-lg-8 form-control-static text-thin">{{CarDetail.SeatAmount}}</label>\n	        </div>\n	        <hr />\n	        <div class="row ">\n	            <label class="col-lg-4 form-control-static">เจ้าหน้าที่ดูแลห้อง : </label>\n	            <label class="col-lg-8 form-control-static text-thin">{{CarDetail.FirstName + \' \' + CarDetail.LastName}}</label>\n	        </div>\n	        <div class="row ">\n	            <label class="col-lg-4 form-control-static">หมายเลขโทรศัพท์ : </label>\n	            <label class="col-lg-8 form-control-static text-thin">{{CarDetail.Mobile}}</label>\n	        </div>\n	        <div class="row ">\n	            <label class="col-lg-4 form-control-static">E-mail : </label>\n	            <label class="col-lg-8 form-control-static text-thin">{{CarDetail.Email}}</label>\n	        </div>\n	        \n		</div>\n		<div class="col-lg-7">\n	        <fieldset ng-disabled="currentUser.UserID != ReserveCarInfo.CreateBy" ng-form=\'reserve_form\'>\n	            <div class="row">\n	                <div class="col-lg-12">\n	                    <h4><b>ผู้ขอจอง : </b>{{ RequestUser.FirstName + \' \' + RequestUser.LastName }}</h4>\n	                    <h4><b>ผู้ตรวจสอบ : </b>{{ VerifyUser.FirstName + \' \' + VerifyUser.LastName }}</h4>\n	                </div>\n	             </div>\n	            <div class="row form-group">\n	                <label class="col-lg-4 form-control-static" for="RegionName"><h3>ข้อมูลการจอง</h3></label>\n	            </div>\n	            <div class="row form-group">\n	                <label class="col-lg-3 form-control-static" for="RegionName">พื้นท ี่</label>\n	                <div class="col-lg-8">\n	                    <select class="form-control" [(ngModel)]="ReserveCarInfo.RegionID" ng-options="region.RegionID as region.RegionName for region in RegionList">\n	                    </select>\n	                </div>\n	            </div>\n	            <div class="row form-group">\n	                <label class="col-lg-3 form-control-static" for="RegionName">จังหวัดปลายทาง</label>\n	                <div class="col-lg-8">\n	                    <select class="form-control" required="true" [(ngModel)]="ReserveCarInfo.ProvinceID" ng-options="province.ProvinceID as province.ProvinceName for province in ProvinceList" [ngClass]="{required_field:ReserveCarInfo.ProvinceID==\'\'}">\n	                        <option value="">กรุณาเลือก</option>\n	                    </select>\n	                </div>\n	            </div>\n	            <div class="row form-group">\n	                <label class="col-lg-3 form-control-static" for="RegionName">สถานที่ปลายทาง</label>\n	                <div class="col-lg-8"><input class="form-control" required="true" [(ngModel)]="ReserveCarInfo.Destination" [ngClass]="{required_field:ReserveCarInfo.Destination==\'\'}" /></div>\n	            </div>\n	            <div class="row form-group">\n	                <label class="col-lg-3 form-control-static" for="RegionName">วัน/เวลา เดินทางไป </label>\n	                <div class="col-lg-5">\n	                    <p class="input-group">\n	                      <input type="text" readonly="true" class="form-control" uib-datepicker-popup="yyyy-MM-dd" [(ngModel)]="ReserveCarInfo.StartDate" is-open="popup1.opened" datepicker-options="dateOptions1" ng-required="true" close-text="Close" [ngClass]="{required_field:ReserveCarInfo.StartDate==null}" ng-disabled="(ReserveCarInfo.ReserveStatus == \'Approve\' || ReserveCarInfo.ReserveStatus == \'Reject\')" ng-blur="checkSelectDateTime(ReserveCarInfo.StartDate, ReserveCarInfo.StartTime, ReserveCarInfo.EndDate, ReserveCarInfo.EndTime)" ng-change="checkBetweenDate()" />\n	                      <span class="input-group-btn">\n	                        <button type="button" class="btn btn-default" (tap)="open1()" ng-disabled="(ReserveCarInfo.ReserveStatus == \'Approve\' || ReserveCarInfo.ReserveStatus == \'Reject\')" [ngClass]="{required_field:ReserveCarInfo.StartDate==null}"><i class="glyphicon glyphicon-calendar"></i></button>\n	                      </span>\n	                    </p>\n	                </div>\n	                <div class="col-lg-3">\n	                    <select class="form-control" required="true" [(ngModel)]="ReserveCarInfo.StartTime" valuedefault="{{ReserveCarInfo.StartTime}}" ng-disabled="(ReserveCarInfo.ReserveStatus == \'Approve\' || ReserveCarInfo.ReserveStatus == \'Reject\')" [ngClass]="{required_field:ReserveCarInfo.StartTime==\'\' || ReserveCarInfo.StartTime == null}" ng-blur="checkSelectDateTime(ReserveCarInfo.StartDate, ReserveCarInfo.StartTime, ReserveCarInfo.EndDate, ReserveCarInfo.EndTime)">\n	                        <option value=""> กรุณาเลือก </option>\n	                        <option ng-repeat="time in StartTimeList" value="{{time}}">{{time}}</option>\n	                    </select>\n	                </div>\n	            </div>\n	            <div class="row form-group">\n	                <label class="col-lg-3 form-control-static" for="RegionName">วัน/เวลา เดินทางกลับ</label>\n	                <div class="col-lg-5">\n	                    <p class="input-group">\n	                      <input type="text" readonly="true" class="form-control" uib-datepicker-popup="yyyy-MM-dd" [(ngModel)]="ReserveCarInfo.EndDate" is-open="popup2.opened" datepicker-options="dateOptions2" ng-required="true" close-text="Close" [ngClass]="{required_field:ReserveCarInfo.EndDate==null}" ng-disabled="(ReserveCarInfo.ReserveStatus == \'Approve\' || ReserveCarInfo.ReserveStatus == \'Reject\')" ng-blur="checkSelectDateTime(ReserveCarInfo.StartDate, ReserveCarInfo.StartTime, ReserveCarInfo.EndDate, ReserveCarInfo.EndTime)" />\n	                      <span class="input-group-btn">\n	                        <button type="button" class="btn btn-default" (tap)="open2()" ng-disabled="(ReserveCarInfo.ReserveStatus == \'Approve\' || ReserveCarInfo.ReserveStatus == \'Reject\')" [ngClass]="{required_field:ReserveCarInfo.EndDate==null}"><i class="glyphicon glyphicon-calendar"></i></button>\n	                      </span>\n	                    </p>\n	                </div>\n	                <div class="col-lg-3">\n	                    <select class="form-control" required="true"  [(ngModel)]="ReserveCarInfo.EndTime" ng-disabled="(ReserveCarInfo.ReserveStatus == \'Approve\' || ReserveCarInfo.ReserveStatus == \'Reject\')" [ngClass]="{required_field:ReserveCarInfo.EndTime==\'\' || ReserveCarInfo.EndTime==null}" ng-blur="checkSelectDateTime(ReserveCarInfo.StartDate, ReserveCarInfo.StartTime, ReserveCarInfo.EndDate, ReserveCarInfo.EndTime)">\n	                        <option value=""> กรุณาเลือก </option>\n	                        <option ng-repeat="time in EndTimeList" value="{{time}}">{{time}}</option>\n	                    </select>\n	                </div>\n	            </div>\n	            <div class="row form-group">\n	                <label class="col-lg-3 form-control-static" for="RegionName">ภารกิจ</label>\n	                <div class="col-lg-8"><input class="form-control" [(ngModel)]="ReserveCarInfo.Mission" [ngClass]="{\'required_field\':ReserveCarInfo.Mission==\'\'}" required="true" /></div>\n	            </div>\n	            <div class="row form-group">\n	                <label class="col-lg-3 form-control-static" for="RegionName">หมายเหตุ</label>\n	                <div class="col-lg-8"><textarea class="form-control" [(ngModel)]="ReserveCarInfo.Remark" ></textarea></div>\n	            </div>\n	            \n	            <hr />        \n	            <div class="row form-group" >\n	                <div class="col-lg-12">\n	                    <div class="panel panel-default">\n	                      <div class="panel-heading"><h4><b>รายชื่อผู้ร่วมเดินทาง</b></h4></div>\n	                      <div class="panel-body">\n	                        <div class="row form-group">\n	                             <label class="col-lg-3 form-control-static">พนักงานขับรถ</label>\n	                            <div class="col-lg-8">\n	                                <div class="btn-group" *ngIf="currentUser.UserID == ReserveCarInfo.CreateBy">\n	                                    <label class="btn btn-info btn-radiobox" [(ngModel)]="ReserveCarInfo.DriverType" uib-btn-radio="\'Y\'" (tap)="setDriver(ReserveCarInfo.DriverType)">ต้องการ</label>\n	                                    <label class="btn btn-info btn-radiobox" [(ngModel)]="ReserveCarInfo.DriverType" uib-btn-radio="\'N\'" (tap)="setDriver(ReserveCarInfo.DriverType)">ไม่ต้องการ</label>\n	                                </div>\n	                                <label class="form-control-static" *ngIf="currentUser.UserID != ReserveCarInfo.CreateBy">\n	                                {{ DriverType==\'Y\'?\'ต้องการ\':\'ไม่ต้องการ\' }}\n	                                </label>\n	                            </div>\n	                        </div>\n	                        <div class="row form-group">\n	                            <label class="col-lg-3 form-control-static">จำนวนผู้เดินทาง</label>\n	                            <div class="col-lg-3">\n	                                <select class="form-control" required="true" [(ngModel)]="ReserveCarInfo.TravelerAmount" ng-options="seatAmount.SeatAmount as seatAmount.SeatAmount for seatAmount in SeatAmountList" [ngClass]="{\'required_field\': ReserveCarInfo.TravelerAmount == null || ReserveCarInfo.TravelerAmount == \'0\'}" ng-change="checkTraveller()">\n	                                    <option value="">กรุณาเลือก</option>\n	                                </select>\n	                            </div>\n	                            <label class="col-lg-1 form-control-static">คน</label>\n	                        </div>\n	                        <div class="row form-group">\n	                            <label class="col-lg-3 form-control-static">ชื่อ - สกุล </label>\n	                            <div class="col-lg-8"><input class="form-control" [(ngModel)]="Traveller.Name" uib-typeahead="user for user in searchUserAutoComplete($viewValue, \'USER\') | limitTo:20" typeahead-on-select="autocompleteUserSelected($item, $model, $label)" ng-paste="$event.preventDefault()" /></div>\n	                        </div>\n	                        <div *ngIf="TravellerList.length > 0">\n	                            <div class="row">\n	                                <div ng-repeat="traveller in TravellerList" class="col-lg-3 alert alert-info alert-dismissible" role="alert">\n	                                  <button type="button" class="close" data-dismiss="alert" aria-label="Close" (tap)="deleteTraveller($index, traveller.TravellerID)" *ngIf="currentUser.UserID == ReserveCarInfo.CreateBy"><span aria-hidden="true">&times;</span></button>\n	                                  {{traveller.FirstName}}&nbsp;{{traveller.LastName}}\n	                                </div>\n	                            </div>\n	                        </div>\n	                      </div>\n	                    </div>\n	                </div>\n	            </div>\n\n	            <div class="row form-group" *ngIf="currentUser.UserID != ReserveCarInfo.AdminID && (ReserveCarInfo.ReserveStatus == \'Approve\' || ReserveCarInfo.ReserveStatus == \'Reject\')">\n	                <div class="col-lg-12">\n	                    <div class="panel panel-success">\n	                      <div class="panel-heading"><h4><b>สถานะการอนุมัติ</b></h4></div>\n	                      <div class="panel-body">\n	                        <div class="row form-group">\n	                            \n	                            <div class="col-lg-4">\n	                                <div class=" status-{{ReserveCarInfo.ReserveStatus}}">\n	                                {{ ReserveCarInfo.ReserveStatus==null||ReserveCarInfo.ReserveStatus==\'Request\'?\'อยู่ระหว่างการพิจารณา\':(ReserveCarInfo.ReserveStatus == \'Approve\' ?\'อนุมัติ\':\'ไม่อนุมัติ\') }}</div>\n	                            </div>\n	                        </div>\n	                        <hr>\n	                        <div class="row form-group" *ngIf="ReserveCarInfo.ReserveStatus == \'Approve\'">\n	                            \n	                            <div class="col-lg-12" *ngIf="ReserveCarInfo.DriverType == \'Internal\'">\n	                                <div class="row form-group">\n	                                    <label class="col-lg-4 form-control-static">\n	                                        พนักงานขับรถ\n	                                    </label>\n	                                    <div class="col-lg-8">\n	                                        <input class="form-control" [(ngModel)]="InternalDriver.Name"  readonly="true" />\n	                                    </div>\n	                                </div>\n	                            </div>\n	                            <div class="col-lg-12" *ngIf="ReserveCarInfo.DriverType == \'External\'">\n	                                <div class="row form-group">\n	                                    <label class="col-lg-4 form-control-static">\n	                                        พนักงานขับรถสัญญาจ้าง\n	                                    </label>\n	                                    <div class="col-lg-8">\n	                                        <input class="form-control" [(ngModel)]="ExternalDriver.DriverName"   readonly="true" />\n	                                    </div>\n	                                </div>\n	                                <div class="row form-group">\n	                                    <label class="col-lg-4 form-control-static">\n	                                        หมายเลขโทรศัพท์\n	                                    </label>\n	                                    <div class="col-lg-8">\n	                                        <input class="form-control" [(ngModel)]="ExternalDriver.Mobile"  readonly="true"  />\n	                                    </div>\n	                                </div>\n	                            </div>\n	                        </div>\n\n	                        <div class="row form-group" *ngIf="ReserveCarInfo.ReserveStatus == \'Reject\'">\n	                            <div class="col-lg-12">\n	                                <textarea readonly="true" class="form-control" [(ngModel)]="ReserveCarInfo.AdminComment" ng-required="ReserveCarInfo.ReserveStatus==\'Reject\' && (ReserveCarInfo.AdminComment==\'\' || ReserveCarInfo.AdminComment==null)"  [ngClass]="{required_field:(ReserveCarInfo.ReserveStatus==\'Reject\' && (ReserveCarInfo.AdminComment==\'\' || ReserveCarInfo.AdminComment == null))}"  required="true" placeholder="ระบุเหตุผล"></textarea> \n	                            </div>\n	                        </div>\n\n	                      </div>\n	                    </div>\n	                </div>\n	            </div>\n	            \n	            </fieldset>\n	        \n	            <div ng-form=\'verify_form\' class="row form-group" *ngIf="ReserveCarInfo.AdminID == currentUser.UserID">\n	            <div class="col-lg-12">\n	                <div class="panel panel-success">\n	                  <div class="panel-heading"><h4><b>สถานะการอนุมัติ</b></h4></div>\n	                  <div class="panel-body">\n	                    <div class="row form-group">\n	                        <div class="col-lg-4">\n	                            <div class="btn-group">\n	                                <label class="btn btn-success btn-radiobox" [(ngModel)]="ReserveCarInfo.ReserveStatus" uib-btn-radio="\'Approve\'" (tap)="checkReserveStatus(\'Approve\')">อนุมัติ</label>\n	                                <label class="btn btn-danger btn-radiobox" [(ngModel)]="ReserveCarInfo.ReserveStatus" uib-btn-radio="\'Reject\'" (tap)="checkReserveStatus(\'Reject\')">ไม่อนุมัติ</label>\n	                            </div>\n	                        </div>\n	                        <div class="col-lg-4">\n	                            <div class=" status-{{ReserveCarInfo.ReserveStatus}}">\n	                            {{ ReserveCarInfo.ReserveStatus==\'\'||ReserveCarInfo.ReserveStatus==\'Request\'?\'อยู่ระหว่างการพิจารณา\':(ReserveCarInfo.ReserveStatus == \'Approve\' ?\'อนุมัติ\':\'ไม่อนุมัติ\') }}</div>\n	                        </div>\n	                    </div>\n	                    <hr>\n	                    <div class="row form-group" *ngIf="ReserveCarInfo.ReserveStatus == \'Approve\' && (DriverType == \'Y\' || ReserveCarInfo.DriverType == \'Internal\' || ReserveCarInfo.DriverType == \'External\')">\n	                        <div class="col-lg-12">\n	                            <div class="btn-group">\n	                                <label class="btn btn-info btn-radiobox" [(ngModel)]="ReserveCarInfo.DriverType" uib-btn-radio="\'Internal\'"  (tap)="checkDriverType(\'Internal\')">พนักงานขับรถ</label>\n	                                <label class="btn btn-info btn-radiobox" [(ngModel)]="ReserveCarInfo.DriverType" uib-btn-radio="\'External\'" (tap)="checkDriverType(\'External\')">พนักงานขับรถสัญญาจ้าง</label>\n	                            </div>\n\n	                        </div>\n	                        <br>&nbsp;<br>\n	                        <div class="col-lg-12" *ngIf="ReserveCarInfo.DriverType == \'Internal\'">\n	                            <div class="row form-group">\n	                                <label class="col-lg-4 form-control-static">\n	                                    พนักงานขับรถ\n	                                </label>\n	                                <div class="col-lg-8">\n	                                    <input class="form-control" [(ngModel)]="InternalDriver.Name" uib-typeahead="user for user in searchDriverAutoComplete($viewValue, \'USER\') | limitTo:20" typeahead-on-select="autocompleteDriverSelected($item, $model, $label)" [ngClass]="{\'required_field\':checkInternalDriverCondition()}" ng-required="(ReserveCarInfo.DriverType == \'Internal\')" ng-paste="$event.preventDefault();" />\n	                                </div>\n	                            </div>\n	                        </div>\n	                        <div class="col-lg-12" *ngIf="ReserveCarInfo.DriverType == \'External\'">\n	                            <div class="row form-group">\n	                                <label class="col-lg-4 form-control-static">\n	                                    พนักงานขับรถสัญญาจ้าง\n	                                </label>\n	                                <div class="col-lg-8">\n	                                    <input class="form-control" [(ngModel)]="ExternalDriver.DriverName"  [ngClass]="{\'required_field\':ReserveCarInfo.DriverType == \'External\' && (ExternalDriver.DriverName == null || ExternalDriver.DriverName == \'\')}" ng-required="(ReserveCarInfo.DriverType == \'External\')" />\n	                                </div>\n	                            </div>\n	                            <div class="row form-group">\n	                                <label class="col-lg-4 form-control-static">\n	                                    หมายเลขโทรศัพท์\n	                                </label>\n	                                <div class="col-lg-8">\n	                                    <input class="form-control" [(ngModel)]="ExternalDriver.Mobile" [ngClass]="{\'required_field\':ReserveCarInfo.DriverType == \'External\' && (ExternalDriver.Mobile == \'\' || ExternalDriver.Mobile == null)}" ui-mask="999-999-9999" model-view-value="true"  ui-mask-placeholder ui-mask-placeholder-char="" ng-required="(ReserveCarInfo.DriverType == \'External\')"  />\n	                                </div>\n	                            </div>\n	                        </div>\n	                    </div>\n\n	                    <div class="row form-group" *ngIf="ReserveCarInfo.ReserveStatus == \'Reject\'">\n	                        <div class="col-lg-12">\n	                            <textarea class="form-control" [(ngModel)]="ReserveCarInfo.AdminComment" ng-required="ReserveCarInfo.ReserveStatus==\'Reject\' && (ReserveCarInfo.AdminComment==\'\' || ReserveCarInfo.AdminComment==null)"  [ngClass]="{required_field:(ReserveCarInfo.ReserveStatus==\'Reject\' && (ReserveCarInfo.AdminComment==\'\' || ReserveCarInfo.AdminComment == null))}" placeholder="ระบุเหตุผล"></textarea> \n	                            \n	                        </div>\n	                    </div>\n\n	                    <div class="row form-group">\n	                        <div class="col-lg-12 obj_center">\n	                            <a role="button" class="btn btn-default" href="#/"><span class="glyphicon glyphicon-arrow-left"></span> กลับไปหน้าแรก </a>\n	                            <button class="btn btn-primary" (tap)="adminUpdateCarStatus()" ng-disabled="(verify_form.$invalid) || (ReserveCarInfo.ReserveStatus == \'Approve\' && ReserveCarInfo.CarID == 0)" *ngIf="ReserveCarInfo.ReserveStatus == \'Approve\'"><span class="glyphicon glyphicon-floppy-disk"></span> บันทึกข้อมูล </button>\n	                            <button class="btn btn-primary" (tap)="adminUpdateCarStatus()" ng-disabled="(ReserveCarInfo.AdminComment==\'\' || ReserveCarInfo.AdminComment==null)" *ngIf="ReserveCarInfo.ReserveStatus == \'Reject\'"><span class="glyphicon glyphicon-floppy-disk"></span> บันทึกข้อมูล </button>\n	                            <button class="btn btn-warning" *ngIf="ReserveCarInfo.ReserveStatus == \'Approve\'" (tap)="showSelectCar()"><span class="glyphicon glyphicon-shopping-cart"></span> เลือกรถ</button>\n	                            <button type="button" class="btn btn-info" (tap)="printReserveCar()" *ngIf="ReserveCarInfo.ReserveStatus == \'Approve\'"><span class="glyphicon glyphicon-ok"></span> พิมพ์ใบจอง</button>\n	                        </div>\n	                    </div>\n	                  </div>\n	                </div>\n	            </div>\n	        </div>\n	        </div>\n	        <div class="row form-group"  *ngIf="currentUser.UserID == ReserveCarInfo.CreateBy && ReserveCarInfo.ReserveStatus == \'\'">\n	            <div class="col-lg-12 obj_center">\n	                <a role="button" class="btn btn-default" href="#/"><span class="glyphicon glyphicon-arrow-left"></span> กลับไปหน้าแรก </a>\n	                <button class="btn btn-primary" (tap)="requestReserveCar()" ng-disabled="(!reserve_form.$valid) || ReserveCarInfo.TravelerAmount == \'0\'" *ngIf="ReserveCarInfo.ReserveCarID == \'\'"><span class="glyphicon glyphicon-floppy-disk"></span> บันทึกข้อมูล </button>\n	                <button type="button" class="btn btn-danger" (tap)="cancelReserveCar(ReserveCarInfo.ReserveCarID)" *ngIf="ReserveCarInfo.ReserveCarID != \'\'"><span class="glyphicon glyphicon-remove"></span> ยกเลิกการจองพาหนะ</button>\n	                <button type="button" class="btn btn-primary" (tap)="saveDraft()" *ngIf="ReserveCarInfo.ReserveCarID != \'\' && ReserveCarInfo.ReserveStatus == null"><span class="glyphicon glyphicon-ok"></span> บันทึก</button>\n	                <button type="button" class="btn btn-info" (tap)="printReserveCar()" *ngIf="ReserveCarInfo.ReserveStatus == \'Approve\'"><span class="glyphicon glyphicon-ok"></span> พิมพ์ใบจอง</button>\n	            </div>\n	        </div>\n\n	        \n\n	    </div>\n	    \n	</div>\n'/*ion-inline-end:"/Applications/ionic_apps/DportalApp/src/pages/car/car.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_date_picker__["a" /* DatePicker */]])
    ], CarPage);
    return CarPage;
}());

//# sourceMappingURL=car.js.map

/***/ })

});
//# sourceMappingURL=0.js.map