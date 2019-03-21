import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SmsStatComponent } from './sms-stat/sms-stat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

 
@NgModule({
  declarations: [
    AppComponent,
    SmsStatComponent,  
 ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
