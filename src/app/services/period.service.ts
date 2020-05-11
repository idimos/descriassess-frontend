import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, Subject,BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Period } from '../models/period';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {
  
  private _period$ = new BehaviorSubject<any>(null);
  private _periodStore : any = null;
  readonly period = this._period$.asObservable();

  constructor(
    private http : HttpClient
  ) { }
  
  loadPeriod(periodid:string){
    this.http.get(environment.API_URL+`/periods/`+periodid).subscribe(
      data => {
        this._periodStore = data;
        this._periodStore.next(this._periodStore);
      },
      error => console.log('Could not load period.')
    );
  }

  loadAllPeriods(){
    this.http.get(environment.API_URL+`/periods`)
    .subscribe(
      data => {
        this._periodStore = data;
        this._period$.next(this._periodStore);
      },
      error => console.log('Could not load configuration.')
    );
  }



deleteSubPeriod(periodid:string,subperiodid:string){
  this.http.delete(environment.API_URL+`/periods/`+periodid+'/'+subperiodid).subscribe(
    data=>{
      this._periodStore = data;
      this._period$.next(this._periodStore);
    }
  )
}

addSubperiod(periodid:string){
  this.http.post(environment.API_URL+`/periods/`+periodid,{}).subscribe(
    data=>{
      this._periodStore = data;
      this._period$.next(this._periodStore);      
    }
  )
}
//   createNewConfiguration(cc:CustomerConfiguration){
//     this.http.post(environment.API_URL+`/customerconfiguration`,cc).subscribe(
//       data => {
//         this._activeCCStore = data;
//         localStorage.setItem('cc',JSON.stringify(data));
//         this._activeCC$.next(Object.assign({}, this._activeCCStore));
//       },
//       error => console.log('Could not create new configuration.')
//     ); 
//   }

//   deleteConfiguration(ccid:string){
//     this.http.delete(environment.API_URL+`/customerconfiguration/`+ccid).subscribe(
//       data => {
//         this._activeCCStore = data['data'];
//         localStorage.setItem('cc',JSON.stringify(data));
//         this._activeCC$.next(Object.assign({}, this._activeCCStore));
//       },
//       error => console.log('Could not create new configuration.')
//     );   
//   }

//   updateConfigurationOrganisation(configid:string,orgid:string){ 
//     this.http.patch(environment.API_URL+`/customerconfiguration/`+configid,{organisationid:orgid}).subscribe(
//       data => {
//         this._activeCCStore = data;
//         localStorage.setItem('cc',JSON.stringify(data));
//         this._activeCC$.next(Object.assign({}, this._activeCCStore));
//       },
//       error => console.log('Could not update new configuration.')
//     );  
//   }
}

