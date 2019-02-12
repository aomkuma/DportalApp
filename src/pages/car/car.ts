import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DatePicker } from '@ionic-native/date-picker';

/**
 * Generated class for the CarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-car',
  templateUrl: 'car.html',
})
export class CarPage {

    constructor(public navCtrl: NavController, public navParams: NavParams, private datePicker: DatePicker) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarPage');
  }
/*
    MaxSeatAmount = 0;
    ReserveCarInfo = {};
    SeatAmountList = [];
    ProvinceList = [];
    RequestUser = {};
    CarTimeList = ['00:00:00','01:00:00','02:00:00','03:00:00','04:00:00','05:00:00'
                        ,'06:00:00','07:00:00','08:00:00','09:00:00','10:00:00','11:00:00','12:00:00'
                        ,'13:00:00','14:00:00','15:00:00','16:00:00','17:00:00','18:00:00'
                        ,'19:00:00','20:00:00','21:00:00','22:00:00','23:00:00']; 
    

  

  getMaxSeatAmount = function (){
        
        this.http.get( this.webServerHost + '/dpo/public/getMaxSeatAmount/', {}, {"Content-Type": "application/json"})
        .then(data => {
          var res = JSON.parse(data.data);
          this.MaxSeatAmount = res.DATA.SeatAmount;
        });
       
    }

    setSeatAmount = function(hasDriver){
        var seatAmount = this.MaxSeatAmount;
        // if(hasDriver == 'Y'){
        //     seatAmount = seatAmount - 1;   
        // }
        this.SeatAmountList = [];

        for(var i = 0; i < seatAmount; i++){
            this.SeatAmountList.push({'SeatAmount':(i+1)});
        }

        if(this.ReserveCarInfo.TravelerAmount > this.SeatAmountList.length){
            this.ReserveCarInfo.TravelerAmount = 0;
        }
    }

    setDriver = function(DriverType){
        this.setSeatAmount(DriverType);
    }

    getProvinceList = function (){
        
        this.http.get( this.webServerHost + '/dpo/public/getProvinceList/', {}, {"Content-Type": "application/json"})
        .then(data => {
          var res = JSON.parse(data.data);
          this.ProvinceList = res.DATA;
        });
    }

    getReserveCarInfo = function(){
      
        this.http.post( this.webServerHost + '/dpo/public/getCarReserveDetail/', {}, {"Content-Type": "application/json"})
        .then(data => {
          var res = JSON.parse(data.data);
          if(res.STATUS=='OK'){
                //alert(res.DATA.ReserveCarInfo.TravelerAmount);
                this.CarDetail = res.DATA.CarInfo;
                this.ReserveCarInfo = {
                    ReserveCarID : res.DATA.ReserveCarInfo.ReserveCarID
                    ,RegionID : parseInt(res.DATA.ReserveCarInfo.RegionID)
                    ,ProvinceID : parseInt(res.DATA.ReserveCarInfo.ProvinceID)
                    ,CarID : res.DATA.ReserveCarInfo.CarID
                    ,StartDateTime : res.DATA.ReserveCarInfo.StartDateTime
                    ,EndDateTime : res.DATA.ReserveCarInfo.EndDateTime
                    ,Destination : res.DATA.ReserveCarInfo.Destination
                    ,Mission : res.DATA.ReserveCarInfo.Mission
                    ,TravelerAmount : parseInt(res.DATA.ReserveCarInfo.TravelerAmount)//(res.DATA.ReserveCarInfo.TravelerAmount==0?this.SeatAmountList[0].SeatAmount:res.DATA.ReserveCarInfo.TravelerAmount)
                    ,DriverType : res.DATA.ReserveCarInfo.DriverType
                    ,Remark : res.DATA.ReserveCarInfo.Remark
                    ,ReserveStatus : res.DATA.ReserveCarInfo.ReserveStatus
                    ,AdminComment : res.DATA.ReserveCarInfo.AdminComment
                    ,AdminID : res.DATA.ReserveCarInfo.AdminID
                    ,CreateBy : res.DATA.ReserveCarInfo.CreateBy
                    ,CreateDateTime : res.DATA.ReserveCarInfo.CreateDateTime
                    ,UpdateBy : res.DATA.ReserveCarInfo.UpdateBy
                    ,UpdateDateTime : res.DATA.ReserveCarInfo.UpdateDateTime
                    ,RegionName : this.$parent.currentUser.RegionName
                    ,ProvinceName : res.DATA.ReserveCarInfo.ProvinceName
                };

                this.DriverType = this.ReserveCarInfo.DriverType;
                this.ReserveCarInfo.StartDate = this.convertDateToSQLString(res.DATA.ReserveCarInfo.StartDateTime);
                this.ReserveCarInfo.StartTime = this.convertTimeToSQLString(res.DATA.ReserveCarInfo.StartDateTime);
                this.ReserveCarInfo.EndDate = this.convertDateToSQLString(res.DATA.ReserveCarInfo.EndDateTime);
                this.ReserveCarInfo.EndTime = this.convertTimeToSQLString(res.DATA.ReserveCarInfo.EndDateTime);
                if(res.DATA.TravellerList != null){
                    this.TravellerList = res.DATA.TravellerList;
                }

                if(res.DATA.InternalDriver != null){
                    this.InternalDriver = res.DATA.InternalDriver;
                    this.InternalDriver.Name =  this.InternalDriver.FirstName + ' ' +  this.InternalDriver.LastName;
                }
                if(res.DATA.ExternalDriver != null){
                    this.ExternalDriver = res.DATA.ExternalDriver;
                }      
                this.RequestUser = res.DATA.RequestUser;
                this.VerifyUser = res.DATA.VerifyUser;

                this.oldValueTravelerAmount = this.ReserveCarInfo.TravelerAmount;

                // Admin setting zone
                if(this.ReserveCarInfo.AdminID == this.currentUser.UserID){
                    if(this.ReserveCarInfo.ReserveStatus == 'Request'){
                        if(this.ReserveCarInfo.DriverType == 'Y'){
                            this.ReserveCarInfo.DriverType = 'Internal';
                        }
                    }
                    
                }

            }
        
        });
    }

    saveDraft = function (){
        
        this.ReserveCarInfo.StartDateTime = this.concatDateTimeSQL(this.ReserveCarInfo.StartDate, this.ReserveCarInfo.StartTime);
        this.ReserveCarInfo.EndDateTime = this.concatDateTimeSQL(this.ReserveCarInfo.EndDate, this.ReserveCarInfo.EndTime);
        
        this.http.post( this.webServerHost + '/dpo/public/updateReserveCarInfo/', {
                            'ReserveCarInfo' : this.ReserveCarInfo
                            ,'TravellerList' : this.TravellerList
                            ,'reserveCarID':this.reserveCarID
                        }, {"Content-Type": "application/json"})
        .then(data => {
          var res = JSON.parse(data.data);
           if(res.STATUS=='OK'){
             alert('บันทึกสำเร็จ');
           }else{
             alert(res.DATA.MSG);
           }
        });        
    }

    deleteTraveller = function (index, travellerID){
        
        this.TravellerList.splice(index, 1);
        
    }

    cancelReserveCar = function (reserveCarID){
        this.alertMessage = 'ต้องการยกเลิกการจองพาหนะ ใช่หรือไม่ ?';
        // var modalInstance = $uibModal.open({
        //     animation : true,
        //     templateUrl : 'html/dialog_confirm.html',
        //     size : 'sm',
        //     scope : this,
        //     backdrop : 'static',
        //     controller : 'ModalDialogCtrl',
        //     resolve : {
        //         params : function() {
        //             return {};
        //         } 
        //     },
        // });
        // modalInstance.result.then(function (valResult) {
            
        this.http.post( this.webServerHost + '/dpo/public/getCarReserveDetail/', {'reserveCarID':reserveCarID}, {"Content-Type": "application/json"})
        .then(data => {
          var res = JSON.parse(data.data);
          if(res.STATUS == 'OK'){
            alert('ยกเลิกการจองเรียบร้อยแล้ว');
          }
        });
        // }, function () {});
            
    }

    requestReserveCar = function (){

        if(parseInt(this.ReserveCarInfo.TravelerAmount) > this.TravellerList.length){
            alert('จำนวนผู้เดินทางมากกว่ารายชื่อที่ถูกเพิ่มไว้');
            return false;
        }

        // this.alertMessage = 'ต้องการส่งคำขอการจองพาหนะ ใช่หรือไม่ ?';
        // var modalInstance = $uibModal.open({
        //     animation : true,
        //     templateUrl : 'html/dialog_confirm.html',
        //     size : 'sm',
        //     scope : this,
        //     backdrop : 'static',
        //     controller : 'ModalDialogCtrl',
        //     resolve : {
        //         params : function() {
        //             return {};
        //         } 
        //     },
        // });
        // modalInstance.result.then(function (valResult) {
            
            
        this.ReserveCarInfo.StartDateTime = this.concatDateTimeSQL(this.ReserveCarInfo.StartDate, this.ReserveCarInfo.StartTime);
        this.ReserveCarInfo.EndDateTime = this.concatDateTimeSQL(this.ReserveCarInfo.EndDate, this.ReserveCarInfo.EndTime);
        
        this.http.post( this.webServerHost + '/dpo/public/requestReserveCar/', {'ReserveCarInfo':this.ReserveCarInfo
                    ,'TravellerList':this.TravellerList
                    ,'RequestUser':this.RequestUser}, {"Content-Type": "application/json"})
        .then(data => {
          var res = JSON.parse(data.data);
          if(res.STATUS == 'OK'){
            alert('ส่งคำขอเรียบร้อยแล้ว');
          }
        });
         
    }

    adminUpdateCarStatus = function (){
        // this.alertMessage = 'ต้องการ '+(this.ReserveCarInfo.ReserveStatus=='Approve'?'อนุมัติ':'ไม่อนุมัติ')+' การจองพาหนะนี้ ใช่หรือไม่ ?';
        // var modalInstance = $uibModal.open({
        //     animation : true,
        //     templateUrl : 'html/dialog_confirm.html',
        //     size : 'sm',
        //     scope : this,
        //     backdrop : 'static',
        //     controller : 'ModalDialogCtrl',
        //     resolve : {
        //         params : function() {
        //             return {};
        //         } 
        //     },
        // });
        // modalInstance.result.then(function (valResult) {
        this.http.post( this.webServerHost + '/dpo/public/adminUpdateCarStatus/', {'ReserveCarInfo':this.ReserveCarInfo
                    ,'TravellerList':this.TravellerList
                    ,'InternalDriver':this.InternalDriver
                    ,'ExternalDriver':this.ExternalDriver}, {"Content-Type": "application/json"})
        .then(data => {
          var res = JSON.parse(data.data);
          if(res.STATUS == 'OK'){
            alert((this.ReserveCarInfo.ReserveStatus=='Approve'?'อนุมัติ':'ไม่อนุมัติ')+'คำขอเรียบร้อยแล้ว');
          }
        }); 
    }



    checkSelectDateTime = function (startDate, startTime, endDate, endTime){
        //console.log(startDate, startTime, endDate, endTime);
        if(startDate != null 
                && endDate != null 
                && (startTime != undefined && startTime != '') 
                && (endTime != undefined && endTime != '')){
            var timeArr = startTime.split(':');
            startDate.setHours(timeArr[0]);
            startDate.setMinutes(timeArr[1]);
            startDate.setSeconds(0);

            timeArr = endTime.split(':');
            endDate.setHours(timeArr[0]);
            endDate.setMinutes(timeArr[1]);
            endDate.setSeconds(0);

            //console.log(startDate > endDate);
            if(startDate > endDate){
                alert('วันที่เดินทางไปน้อยกว่าวันที่เดินทางกลับ');
                
                this.ReserveCarInfo.EndDate = null;
                this.ReserveCarInfo.EndTime = '';
                
            }
        }
    }

    checkReserveStatus = function (type){
        if(type == 'Reject'){
            this.ExternalDriver.DriverName = '';
            this.ExternalDriver.Mobile = '';
            this.InternalDriver.Name = '';
        }else{
            this.ReserveCarInfo.AdminComment = '';
        }
    }

    checkDriverType = function (type){
        if(type == 'Internal'){
            this.ExternalDriver.DriverName = '';
            this.ExternalDriver.Mobile = '';
        }else{
            this.InternalDriver.Name = '';
        }
    }

    checkTraveller = function (){
        var totalTraveller = this.TravellerList.length;
        if(this.ReserveCarInfo.TravelerAmount < totalTraveller){
            alert('จำนวนผู้เดินทางที่เลือกน้อยกว่าจำนวนผู้เดินทางที่เพิ่มไว้');
            this.ReserveCarInfo.TravelerAmount = this.oldValueTravelerAmount;   
            
        }else{
            this.oldValueTravelerAmount = this.ReserveCarInfo.TravelerAmount;
        }
    }

    checkInternalDriverCondition = function (){
        return (this.ReserveCarInfo.DriverType == 'Internal' && (this.InternalDriver.Name == '' || this.InternalDriver.Name == null));
    }

    convertDateToSQLString = function(dateInput){
        // console.log(dateInput);
        // dateInput = dateInput.replace('.000','');
        var d1 = dateInput.split(' ');
        // d1[0] = date , d1[1] = time
        var d2 = d1[0].split('-');
        var d3 = d1[1].split(':');
        var d = new Date(d2[0], parseInt(d2[1]) - 1, d2[2]);
        // d.setDate(31);
        // d.setMonth(parseInt(d2[1]) - 1);
        // d.setYear(d2[0]);
        d.setSeconds(d3[2]);
        d.setMinutes(d3[1]);
        d.setHours(d3[0]);
        // console.log(d);
        return d;
    }

    concatDateTimeSQL(d , t){
        return d.getFullYear() + '-' + this.padLeft(""+(d.getMonth() + 1), '00') + '-' + this.padLeft(""+(d.getDate()), '00') + ' ' + t + ':00';
    }

    padLeft(str, pad){
        return pad.substring(0, pad.length - str.length) + str;
    }

    showStartDateTime(){
        this.datePicker.show({
          date: new Date(),
          mode: 'date',
          androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
        }).then(
          date => console.log('Got date: ', date),
          err => console.log('Error occurred while getting date: ', err)
        );
    }

    showEndDateTime(){
        this.datePicker.show({
          date: new Date(),
          mode: 'date',
          androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
        }).then(
          date => console.log('Got date: ', date),
          err => console.log('Error occurred while getting date: ', err)
        );
    }
*/
}
