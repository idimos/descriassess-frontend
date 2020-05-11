import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrgtypeService {

   constructor(
    private http : HttpClient
  ) { }

  getorgTypes():Observable<any>{
    return this.http.get(environment.API_URL+`/orgtypes`);
  }

}
