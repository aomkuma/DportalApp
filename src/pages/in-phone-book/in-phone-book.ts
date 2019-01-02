import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HTTP } from '@ionic-native/http';
import { Storage } from '@ionic/storage';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the InPhoneBookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-in-phone-book',
  templateUrl: 'in-phone-book.html',
})
export class InPhoneBookPage {
	webServerHost : string = 'https://dportal.dpo.go.th';
	offset = 0;
	LoginObj : any = {};
	PhoneList :any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:HTTP
	      	, private storage: Storage
	      	,private callNumber: CallNumber) {
  		storage.get('LoginObj').then((val) => {
			if(val != null && val != ''){
        		this.LoginObj = JSON.parse(val);
        		this.getPhone();
        	}
		});	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InPhoneBookPage');
  }

  makeCall(phone_number){
  	if(phone_number != ''){
  		this.callNumber.callNumber(phone_number, true);
  	}
  }

  getPhone(){
		var url = this.webServerHost + '/dpo/public/getPhoneBookList/ALL/-/0/1/1/' + this.LoginObj.UserID;
		this.http.get(url,{},{})
	      .then(data => {
	        var res = JSON.parse(data.data);
	        this.PhoneList = res.data.DATA.DataList;
	        console.log(JSON.stringify(this.PhoneList));
	        })
		.catch(error => {

			console.log(error.status);
			console.log(error.error); // error message as string
			console.log(error.headers);

		});
	}

}
