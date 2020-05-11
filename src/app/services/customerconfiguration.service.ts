import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, Subject,BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CustomerConfiguration } from '../models/customerconfiguration';

@Injectable({
  providedIn: 'root'
})
export class CustomerconfigurationService {
  
  private _activeCC$ = new BehaviorSubject<any>(null);
  private _activeCCStore : any = null;
  readonly activeCC = this._activeCC$.asObservable();
  private _useremail :string = JSON.parse(localStorage.getItem('user')).email;

  constructor(
    private http : HttpClient
  ) { }
  
  loadCC(){
    this.http.get(environment.API_URL+`/customerconfiguration/`+this._useremail).subscribe(
      data => {
        this._activeCCStore = data;
        // console.log("Service: "+this._activeCCStore);
        localStorage.setItem('cc',JSON.stringify(data));
        // this._activeCC$.next(Object.assign({}, this._activeCCStore));
        this._activeCC$.next(this._activeCCStore);
      },
      error => console.log('Could not load configuration.')
    );
  }

  createNewConfiguration(cc:CustomerConfiguration){
    this.http.post(environment.API_URL+`/customerconfiguration`,cc).subscribe(
      data => {
        this._activeCCStore = data;
        localStorage.setItem('cc',JSON.stringify(data));
        this._activeCC$.next(Object.assign({}, this._activeCCStore));
      },
      error => console.log('Could not create new configuration.')
    ); 
  }

  deleteConfiguration(ccid:string){
    this.http.delete(environment.API_URL+`/customerconfiguration/`+ccid).subscribe(
      data => {
        this._activeCCStore = data['data'];
        localStorage.setItem('cc',JSON.stringify(data));
        this._activeCC$.next(Object.assign({}, this._activeCCStore));
      },
      error => console.log('Could not create new configuration.')
    );   
  }

  updateConfigurationOrganisation(configid:string,orgid:string){ 
    this.http.patch(environment.API_URL+`/customerconfiguration/`+configid,{organisationid:orgid}).subscribe(
      data => {
        this._activeCCStore = data;
        localStorage.setItem('cc',JSON.stringify(data));
        this._activeCC$.next(Object.assign({}, this._activeCCStore));
      },
      error => console.log('Could not update new configuration.')
    );  
  }
}
