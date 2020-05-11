import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Organisation } from '../models/organisation';

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {

  constructor(
    private http : HttpClient
  ) {  }

  getOrganisations():Observable<any>{
    return this.http.get(environment.API_URL+`/organisation`);
  }

  getUserOrganisation(organisationid:string):Observable<any>{
    return this.http.get(environment.API_URL+`/organisation/`+organisationid); //TODO from customerconfiguration
  }

  deleteOrganisation(orgid:string):Observable<any>{
    return this.http.delete(environment.API_URL+`/organisation/`+orgid);
  }

  saveOrganisation(neworg:Organisation):Observable<any>{
    return this.http.post(environment.API_URL+`/organisation`,neworg);
  }

  updateOrganisation(organisationid:string,org:Organisation):Observable<any>{
    return this.http.patch(environment.API_URL+`/organisation/`+organisationid,org);
  }
}
