import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HTTP } from '@ionic-native/http';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
	webServerHost : string = 'https://dportal.dpo.go.th';
	offset = 0;
	LoginObj : any = {};
	Data :any = {};
	NewPinID : string = '';
	ConfirmPinID : string = '';
	constructor(public navCtrl: NavController, public navParams: NavParams, public http:HTTP
	      	, private storage: Storage) {
		storage.get('LoginObj').then((val) => {
			if(val != null && val != ''){
        		this.LoginObj = JSON.parse(val);
        		this.getUserProfiles();
        	}
		});	
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad UserProfilePage');
	}

	getUserProfiles(){
		var url = this.webServerHost + '/dpo/public/getUserContact/' + this.LoginObj.UserID;
		this.http.get(url,{},{})
	      .then(data => {
	        var res = JSON.parse(data.data);
	        this.Data = res.data.DATA;
	        console.log(JSON.stringify(this.Data));
	        })
		.catch(error => {

			console.log(error.status);
			console.log(error.error); // error message as string
			console.log(error.headers);

		});
	}

	saveData(Data){

		if(this.NewPinID != ''){
			if(this.ConfirmPinID == ''){
				alert('กรุณายืนยัน PIN ใหม่');
				return false;
			}else if(this.NewPinID != this.ConfirmPinID){
				alert('รหัส PIN ใหม่และ ยืนยันรหัส PIN ใหม่ไม่ตรงกัน กรุณาตรวจสอบข้อมูล');
				return false;
			}else if(this.NewPinID == Data.PinID){
				alert('รหัส PIN ใหม่ ซ้ำกับ PIN เดิม');
				return false;
			}else{
				Data.PinID = this.NewPinID;
				console.log(Data.PinID);
			}
		}
		var url = this.webServerHost + '/dpo/public/updatePhoneBookContact/';
		this.http.post(url,{'Contact' : Data},{})
	      .then(data => {
	        var res = JSON.parse(data.data);
	        alert('บันทึกสำเร็จ');
	        this.NewPinID = '';
	        this.ConfirmPinID = '';
	        // this.Data = res.data.DATA;
	        // console.log(JSON.stringify(this.Data));
	        })
		.catch(error => {

			console.log(error.status);
			console.log(error.error); // error message as string
			console.log(error.headers);

		});
		
	}
	
}
