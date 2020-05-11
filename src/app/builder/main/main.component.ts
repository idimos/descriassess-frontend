import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { CustomerconfigurationService } from '../../services/customerconfiguration.service';
import { CustomerConfiguration } from '../../models/customerconfiguration';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  
  ccSubsription : Subscription;
  startButtonShow : Boolean = false;
  organisationEnabledBtn : Boolean = true;
  periodsEnabledBtn: Boolean = true;
  departmentsEnabledBtn : Boolean = false;
  coursesEnabledBtn : Boolean = false;
  rubricsEnabledBtn : Boolean = false;
  studentsEnabledBtn : Boolean = false;

  constructor(
    private router:Router,
    private ccSrv : CustomerconfigurationService
  ) { }

  ngOnInit(): void {
    this.ccSubsription = this.ccSrv.activeCC.subscribe(cc=>{
      let temp = cc;
      this.startButtonShow = (temp == null);
      this.organisationEnabledBtn = (temp != null && temp.organisation != null);
      this.periodsEnabledBtn = this.organisationEnabledBtn;
      this.departmentsEnabledBtn = (temp != null && temp.periods != null)
      if (!this.startButtonShow) this.router.navigate(['builder/organisation']);
    })
    this.ccSrv.loadCC();
  }

  ngOnDestroy(): void {
    this.ccSubsription.unsubscribe();
  }

  startConfiguration(){
    try {
      let cc = new CustomerConfiguration();
      cc.userid = JSON.parse(localStorage.getItem('apiuserresponse')).userid;
      cc.useremail = JSON.parse(localStorage.getItem('user')).email;
      cc.organisation = null;
      cc.active = true;
      this.ccSrv.createNewConfiguration(cc);
      this.ccSrv.loadCC();
      this.startButtonShow = false;
      this.buildOrganisation();
    } catch {

    }

  }

  buildOrganisation(){ 
    this.router.navigate(['builder/organisation']); 
  }

  buildPeriods(){ 
    this.router.navigate(['builder/periods']); 
  }
  buildDepartments(){ 
    this.router.navigate(['builder/departments']); 
  }
  buildCourses(){ 
    this.router.navigate(['builder/courses']); 
  }
  buildRubrics(){ 
    this.router.navigate(['builder/rubrics']); 
  }
  buildStudents(){ 
    this.router.navigate(['builder/students']); 
  }
}
