import { Component, OnInit } from '@angular/core';
import { CustomerconfigurationService } from '../../services/customerconfiguration.service';
import { PeriodService } from '../../services/period.service';
import { Period } from '../../models/period';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SubperiodComponent} from './subperiod/subperiod.component'

@Component({
  selector: 'app-periods',
  templateUrl: './periods.component.html',
  styleUrls: ['./periods.component.css']
})
export class PeriodsComponent implements OnInit {
  activeConfiguration : any;
  activePeriod : Period;
  periodSubscr : Subscription;
  periodForm : FormGroup;
  startDate = new Date(2018, 0, 1);
  addsubPeriodFlag : Boolean = false;

  constructor(
    private customerConfigurationSrv : CustomerconfigurationService,
    private periodSrv : PeriodService,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
      this.customerConfigurationSrv.activeCC.subscribe(x=>{

          this.activeConfiguration = x;
          console.log(this.activeConfiguration);

          if (this.activeConfiguration && this.activeConfiguration.period) {
              this.activePeriod = this.activeConfiguration.period;
              
              this.periodForm = this.fb.group({
                periodname:[this.activePeriod.name,Validators.required],
                periodnotes:[this.activePeriod.notes],
                startdate:[this.activePeriod.startdate,Validators.required],
                enddate:[this.activePeriod.enddate,Validators.required]
              });
            
          } else if (this.activeConfiguration && this.activeConfiguration.period == null){
            this.activePeriod = null;
            this.periodForm = this.fb.group({
              periodname:['',Validators.required],
              periodnotes:[''],
              startdate:['',Validators.required],
              enddate:['',Validators.required]
            });           
          }
          
        },
        (err=>{
          console.log(err);
        })
      )}
 
  ngOnDestroy(): void {

    // this.periodSubscr.unsubscribe();
  }

  update(){
    console.log("Update period");
  }

  delete(){
    console.log("delete period");
  }

  add(){
    console.log("Add period");
  }

  addsubperiod(){
    this.addsubPeriodFlag = true;
  }
}
