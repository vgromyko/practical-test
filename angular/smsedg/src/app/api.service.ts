import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders , HttpErrorResponse} from '@angular/common/http';
import { map , catchError, retry} from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  protected url : string = 'http://www.qrz.co.il/studio/vgromyko.info/projects/api/modapi.php';

  constructor(private http: HttpClient ) { }


  getSmsData(userId,countryId,dateFrom,dateTo) {
     return this.http
       .get<any[]>(this.url + '?'+'userId='+userId+'&countryId='+countryId+'&dateFrom='+dateFrom+'&dateTo='+dateTo )
       .pipe(map(data => data));
   }

  getCountryName(countryName){
    return this.http
    .get<any[]>(this.url + '?'+'countryName='+countryName )
    .pipe(map(data => data));
  }

  
  getUserName(userName){
    return this.http
    .get<any[]>(this.url + '?'+'userName='+userName )
    .pipe(map(data => data));
  }


 
}
