import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HTTP } from '@ionic-native/http';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

	NewsList :any = [];
	LinkList :any = [];
	LoginObj : any = {};
	webServerHost : string = 'https://dportal.dpo.go.th';

	constructor(public navCtrl: NavController, public http:HTTP, private storage: Storage, private iab: InAppBrowser, public navParams: NavParams) {
		this.storage.get('LoginObj').then((val) => {
			console.log(val);
			if(val != null && val != ''){
        		this.LoginObj = JSON.parse(val);
        		this.getNews();
				this.getLink();
        	}
		});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad DashboardPage');
		

	}

	getNews(){
		console.log('Get News');
		var url = this.webServerHost + "/dpo/public/getNewsListView/0/0/Y";
		this.http.get(url,{},{})
	      .then(data => {
	      	console.log(data.data);
	        var res = JSON.parse(data.data);
	        this.NewsList = res.data.DATA.DataList;
	        // console.log(JSON.stringify(this.NewsList));
	        })
		.catch(error => {

			console.log(error.status);
			console.log(error.error); // error message as string
			console.log(error.headers);

		});
	}

	getLink(){
		console.log('Get Link');
		var url = this.webServerHost + '/dpo/public/getLinkList/view/' + this.LoginObj.UserID;
		this.http.get(url,{},{})
	      .then(data => {
	      	console.log(data.data);
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

	openWebDPO(url)
	{
	 var openurl = this.webServerHost + '/mobile' + url + '//' + btoa((encodeURIComponent(JSON.stringify(this.LoginObj))));// + (JSON.stringify(this.LoginObj));
	 console.log(openurl);
	 // url = url + '/'+ (JSON.stringify(this.LoginObj));
	 const browser = this.iab.create(openurl,'_blank',{location:'yes', 'clearcache' :'yes', 'zoom':'no', 'enableViewportScale':'yes'});
	browser.on('loaderror').subscribe(loadError => {
	      console.log("LOG: API Error");
	    console.log(loadError.message);
	    
	});
	browser.on('loadstop').subscribe((event) => {
	      console.log("LOG: API Response");
	      console.log(event.bubbles);
	      console.log(event.code);
	      // console.log(event.composed);
	      console.log(event.message);
	      browser.show();
	      // console.log(event.message);
	    });
	}

}
