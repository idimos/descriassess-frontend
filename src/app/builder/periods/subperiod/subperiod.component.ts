import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeriodService } from '../../../services/period.service';
import { CustomerconfigurationService } from '../../../services/customerconfiguration.service';

@Component({
  selector: 'app-subperiod',
  templateUrl: './subperiod.component.html',
  styleUrls: ['./subperiod.component.css']
})
export class SubperiodComponent implements OnInit {

  @Input() subperiod : any = null;
  @Input() counter : number;
  @Input() periodid : string;
  subperiodForm : FormGroup;
  startDate = new Date(2018, 0, 1);
  
  constructor(
    private periodSrv : PeriodService,
    private ccSrv : CustomerconfigurationService,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    if (this.subperiod) {
      this.subperiodForm = this.fb.group({
        subperiodname:[this.subperiod.name,Validators.required],
        subperiodnotes:[this.subperiod.notes],
        subperiodstartdate:[this.subperiod.startdate,Validators.required],
        subperiodenddate:[this.subperiod.enddate,Validators.required]
      });
    } 
    // else {
    //   console.log("create empty form");
    //   this.emptysubperiodForm = this.fb.group({
    //     subperiodname:['',Validators.required],
    //     subperiodnotes:[''],
    //     subperiodstartdate:['',Validators.required],
    //     subperiodenddate:['',Validators.required]
    //   });      
    // }
    
  }

  deleteSubperiod(){
    this.periodSrv.deleteSubPeriod(this.periodid,this.subperiod._id);
    this.ccSrv.loadCC();
  }

}
