import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css'] 
})
export class AboutusComponent implements OnInit { 
  Cnfg :any = null;
  private jsonConfigPath$ = 'assets/config.json';

  constructor(
    private http: HttpClient
  ) { 
    this.http.get(this.jsonConfigPath$).subscribe( (data)=>{
      this.Cnfg = data;
     })
  }

  ngOnInit(): void {

  }

}
