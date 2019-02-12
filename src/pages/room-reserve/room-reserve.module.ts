import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoomReservePage } from './room-reserve';

@NgModule({
  declarations: [
    RoomReservePage,
  ],
  imports: [
    IonicPageModule.forChild(RoomReservePage),
  ],
})
export class RoomReservePageModule {}
