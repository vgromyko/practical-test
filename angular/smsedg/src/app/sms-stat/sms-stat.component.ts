import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { ValidatorFn } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
 
import { ApiService } from '../api.service';


@Component({
  selector: 'app-sms-stat',
  templateUrl: './sms-stat.component.html',
  styleUrls: ['./sms-stat.component.css']
})
export class SmsStatComponent  {

  constructor(private fb: FormBuilder , private _api : ApiService , private http: HttpClient ) { }

  public smsList   ;
  public countryList ;
  public userList   ;

  public countryId : string ;
  public countryName : string;
  public userId : string ;
  public userName : string ;
  public dateFrom : string ;
  public dateTo : string ;
  public isRun = false;
  public display ="popupOf";
  public showtab ="showtabOf";

   

  smsstatForm = this.fb.group({
    userName: ['', Validators.compose([ Validators.minLength(1),Validators.required ])],
    countryName: ['', Validators.compose([Validators.minLength(1),Validators.required ])],
    from: ['',Validators.compose([ this.datesValidator(),Validators.required ])],
    to: ['', Validators.compose([this.datesValidator(),Validators.required ])]
  });



  private datesValidator(): ValidatorFn {
    const pattern: RegExp = /^2[0-9]{3}-(0[1-9]|11|12)-(0[1-9]|[1-2][0-9]|30|31)/im ;

    return (control: AbstractControl):{[key:string]: any}=>{

      if(!(control.dirty || control.touched)){
       
        return null ;
      } else {
        return pattern.test(control.value) ? null :{custom: `Invalid date format`}
      }  

    };

  }


  updateProfile() {
    this.userId='4';
    this.countryId='109';
    this.smsstatForm.patchValue({
      userName: 'Joseph',
      countryName : 'Israel',
      from:'2019-03-10',
      to: '2019-03-20'
      
    });
  }


onSubmit(){
  this.getSmsData();
}

  getSmsData(): void {

    if(this.smsstatForm.status =='VALID' && !this.isRun){
      this.showtab ="showtabOn";
      this.isRun = true ;
  
      let smsData =  null ; 
      this._api.getSmsData(
          this.userId, 
          this.countryId, 
          this.smsstatForm.value.from , 
          this.smsstatForm.value.to 
      ).subscribe( data => {
          smsData = data;
          this.smsList = smsData.data; 
          this.isRun = false ;
        })
      }
  }

  countryNameVal(name){

    if( this.smsstatForm.controls.countryName.valid ){
       this.getCountry(name);
       this.userList = null ;
       this.display = "popupOn";
    }
  }

  getCountry(countryName): void {

      this._api.getCountryName(countryName)
        .subscribe( data => { 
          this.countryList = data ;
        });
  }

  selectCountry(name, id){

    this.smsstatForm.patchValue({countryName: name});
    this.countryId = id;
    this.countryList = null;
    this.display = "popupOf";
    this.getSmsData();
  }


  userNameVal(name){

      if( this.smsstatForm.controls.userName.valid ){
         this.getUser(name);
         this.countryList = null ;
         this.display = "popupOn";
      }
    }

  getUser(userName): void {

    this._api.getUserName(userName)
      .subscribe( data => { 
        this.userList = data; 
      } );
  }

  selectUser(name, id){

    this.smsstatForm.patchValue({userName: name});
    this.userId = id;
    this.userList = null;
    this.display = "popupOf";
    this.getSmsData();
  }

}
