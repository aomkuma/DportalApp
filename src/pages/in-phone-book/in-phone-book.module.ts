import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InPhoneBookPage } from './in-phone-book';

@NgModule({
  declarations: [
    InPhoneBookPage,
  ],
  imports: [
    IonicPageModule.forChild(InPhoneBookPage),
  ],
})
export class InPhoneBookPageModule {}
