import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { FriendComponent } from './friend/friend.component';
import { MessageComponent } from './message/message.component';
import { ClComponent } from './game/cl/cl.component';
import{ SpacemanComponent } from './game/spaceman/spaceman.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserComponent },
  { path: 'friend', component: FriendComponent },
  { path: 'message', component: MessageComponent },
  { path: 'game/cl', component: ClComponent },
  {path:'game/spaceman',component:SpacemanComponent}
];
