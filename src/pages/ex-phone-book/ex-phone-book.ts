import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HTTP } from '@ionic-native/http';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ExPhoneBookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ex-phone-book',
  templateUrl: 'ex-phone-book.html',
})
export class ExPhoneBookPage {
	webServerHost : string = 'https://dportal.dpo.go.th';
	offset = 0;
	LoginObj : any = {};
	PhoneList :any = [];
	constructor(public navCtrl: NavController, public navParams: NavParams, public http:HTTP
	      	, private storage: Storage) {
		storage.get('LoginObj').then((val) => {
			if(val != null && val != ''){
        		this.LoginObj = JSON.parse(val);
        		this.getPhone();
        	}
		});	
	}

	ionViewDidLoad() {
	console.log('ionViewDidLoad ExPhoneBookPage');
	}

	getPhone(){
		var url = this.webServerHost + '/dpo/public/getExternalPhoneBookList/';
		this.http.post(url,{'offset' : 0, 'condition' : {'LoginUserID':this.LoginObj.UserID}},{})
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
