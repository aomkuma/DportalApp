import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExPhoneBookPage } from './ex-phone-book';

@NgModule({
  declarations: [
    ExPhoneBookPage,
  ],
  imports: [
    IonicPageModule.forChild(ExPhoneBookPage),
  ],
})
export class ExPhoneBookPageModule {}
