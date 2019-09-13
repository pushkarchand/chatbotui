import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandpageComponent } from './landpage/landpage.component';
import { MessageRoomComponent } from './message-room/message-room.component';


const routes: Routes = [
  {path:'',component:LandpageComponent},
  {path:'message',component:MessageRoomComponent},
  {path:'**',component:LandpageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
