import { Component, OnInit,Inject } from '@angular/core';
import { CustomerconfigurationService } from '../../services/customerconfiguration.service';
import { PeriodService } from '../../services/period.service';
import { Period } from '../../models/period';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
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

  constructor(
    private customerConfigurationSrv : CustomerconfigurationService,
    private periodSrv : PeriodService,
    private fb:FormBuilder,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
      this.customerConfigurationSrv.activeCC.subscribe(x=>{

          this.activeConfiguration = x;
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
      )  
    }
 
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

  openEmptySubPEriodForm(){
    const dialogRef = this.dialog.open(DialogAddsubPeriod,{
      data: this.activePeriod
    })

    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        console.log(res);
        let sp = {
          subperiodname:res.subperiodname,
          subperiodnotes : res.subperiodnotes,
          subperiodstartdate : res.subperiodstartdate,
          subperiodenddate : res.subperiodenddate
        }
        this.periodSrv.addSubperiod(this.activePeriod._id,sp)
        this.customerConfigurationSrv.loadCC;
      //   this.organisationSrv.deleteOrganisation(this.activeOrganisation._id)
      //   .subscribe(res=>{
      //     this.dialog.open(DialogMessageConfirmation,{
      //       data: res.message
      //     })
      //     this.activeOrganisation = null;
      //     this.resetForm();
      //     this.configurationExists = false;
      //     this.customerConfigurationSrv.loadCC();
      //   })
      }
    })
  }

}


@Component({
  selector: 'app-dialog-add-subperiod',
  templateUrl: './dialog-add-subperiod.html' 
})
export class DialogAddsubPeriod implements OnInit {

  emptysubperiodForm : FormGroup;
  startDate = new Date(2018, 0, 1);

  constructor(
    private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(){
    this.emptysubperiodForm = this.fb.group({
        subperiodname:['',Validators.required],
        subperiodnotes:[''],
        subperiodstartdate:['',Validators.required],
        subperiodenddate:['',Validators.required]
      });  
  }
}