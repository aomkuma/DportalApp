import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HTTP } from '@ionic-native/http';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the LinkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-link',
  templateUrl: 'link.html',
})
export class LinkPage {
	webServerHost : string = 'https://dportal.dpo.go.th';
	offset = 0;
	LoginObj : any = {};
	LinkList :any = [];
	constructor(public navCtrl: NavController, public navParams: NavParams
			, public http:HTTP
	      	, private storage: Storage
	      	, private iab: InAppBrowser) {
		storage.get('LoginObj').then((val) => {
			if(val != null && val != ''){
        		this.LoginObj = JSON.parse(val);
        		this.getLink();
        	}
		});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LinkPage');
	}

	getLink(){
		var url = this.webServerHost + '/dpo/public/getLinkList/view/' + this.LoginObj.UserID;
		this.http.get(url,{},{})
	      .then(data => {
	        var res = JSON.parse(data.data);
	        this.LinkList = res.data.DATA.DataList;
	        console.log(JSON.stringify(this.LinkList));
	        })
		.catch(error => {

			console.log(error.status);
			console.log(error.error); // error message as string
			console.log(error.headers);

		});
	}

	openWeb(url)
   {
     const browser = this.iab.create(url,'_blank',{location:'yes', 'clearcache' :'yes'});
      browser.on('loaderror').subscribe(loadError => {
          console.log(loadError);
      });
   }
	

}
