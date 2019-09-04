import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageRoomComponent } from './message-room/message-room.component';
import { FormsModule } from '@angular/forms';
import {MessageService} from './services/message-handler.service';
import { LandpageComponent } from './landpage/landpage.component';
@NgModule({
  declarations: [
    AppComponent,
    MessageRoomComponent,
    LandpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
