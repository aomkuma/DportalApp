import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HTTP } from '@ionic-native/http';
import { Storage } from '@ionic/storage';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';

/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
	webServerHost : string = 'https://dportal.dpo.go.th';
	offset = 0;
	LoginObj : any = {};
	NewsList :any = [];
	constructor(public navCtrl: NavController, public navParams: NavParams
			, public http:HTTP
	      	, private storage: Storage
	      	, private document: DocumentViewer) {
		storage.get('LoginObj').then((val) => {
			if(val != null && val != ''){
        		this.LoginObj = JSON.parse(val);
        		this.getNews();
        	}
		});
	}

	ionViewDidLoad() {
	console.log('ionViewDidLoad NewsPage');
	}

	getNews(){
		var url = this.webServerHost + "/dpo/public/getNewsListView/" + this.offset +"/0/Y";
		this.http.get(url,{},{})
	      .then(data => {
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

	viewPDF(url){
		const options: DocumentViewerOptions = {
		  title: 'องค์การส่งเสริมกิจการโคนมแห่งประเทศไทย : เอกสารแนบ'
		}

		this.document.viewDocument(url, 'application/pdf', options);
	}

	convertDateToFullThaiDateIgnoreTime(date){
		if(date != null && date != ''){
	        var dateTxt = '';
	        var monthTxt = '';
	        var dateTimeArr = date.split(' ');
	        var dateArr = dateTimeArr[0].split('-');
	        
	        switch(parseInt(dateArr[1])){
	            case 1 : monthTxt = 'มกราคม';break;
	            case 2 : monthTxt = 'กุมภาพันธ์';break;
	            case 3 : monthTxt = 'มีนาคม';break;
	            case 4 : monthTxt = 'เมษายน';break;
	            case 5 : monthTxt = 'พฤษภาคม';break;
	            case 6 : monthTxt = 'มิถุนายน';break;
	            case 7 : monthTxt = 'กรกฎาคม';break;
	            case 8 : monthTxt = 'สิงหาคม';break;
	            case 9 : monthTxt = 'กันยายน';break;
	            case 10 : monthTxt = 'ตุลาคม';break;
	            case 11 : monthTxt = 'พฤศจิกายน';break;
	            case 12 : monthTxt = 'ธันวาคม';break;
	        }
	        return dateArr[2] + ' ' + monthTxt + ' ' + (parseInt(dateArr[0]) + 543);
	    }else{
	    	return '';
	    }
    }

}
