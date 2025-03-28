import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { FriendComponent } from './friend/friend.component';
import { MessageComponent } from './message/message.component';
import { ClComponent } from './game/cl/cl.component';
import { RrComponent } from './game/rr/rr.component';
import { SpacemanComponent } from './game/spaceman/spaceman.component';
import { Slot777Component } from './game/slot777/slot777.component';
import { RechargeComponent } from './recharge/recharge.component';
import { TransferComponent } from './transfer/transfer.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserComponent },
  { path: 'friend', component: FriendComponent },
  { path: 'message', component: MessageComponent },
  { path: 'game/cl', component: ClComponent },
  { path: 'game/rr', component: RrComponent },
  { path: 'game/spaceman', component: SpacemanComponent },
  { path: 'game/slot777', component: Slot777Component },
  { path: 'recharge', component: RechargeComponent },
  { path: 'atm/transfer', component: TransferComponent },
];
