import { Component, OnInit,Inject, OnDestroy } from '@angular/core';
import { OrganisationService } from '../../services/organisation.service';
import { CustomerconfigurationService } from '../../services/customerconfiguration.service';
import { OrgtypeService } from '../../services/orgtype.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Organisation } from '../../models/organisation';
import { CustomerConfiguration } from 'src/app/models/customerconfiguration';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.css']
})
export class OrganisationComponent implements OnInit { 

  activeConfiguration : any = null;
  ccSubsription : Subscription;

  configurationExists : Boolean = false;
  OrgTypes: [];

  activeOrgType : string;
  activeOrganisation : Organisation = null;
  organisationForm : FormGroup;

  constructor(
    private organisationSrv : OrganisationService,
    private customerConfigurationSrv : CustomerconfigurationService,
    private orgtypeSrv : OrgtypeService,
    private fb:FormBuilder,
    public dialog: MatDialog
  ) { 
    this.orgtypeSrv.getorgTypes().subscribe(res=>{
      this.OrgTypes = res.orgtypes;
    })

  }

  ngOnInit(): void {
    this.ccSubsription = this.customerConfigurationSrv.activeCC.subscribe(cc=>{
      this.activeConfiguration = cc;
      if (this.activeConfiguration && this.activeConfiguration.organisation) {
        this.configurationExists = true;
        this.activeOrganisation = this.activeConfiguration.organisation;
        let org = this.activeOrganisation;
        this.organisationForm = this.fb.group({
              name:[org.name,Validators.required],
              orgtype:[org.orgtype,Validators.required],
              contact: this.fb.group({
                address:[org.contact.address],
                email:[org.contact.email,[Validators.required, Validators.email]],
                website:[org.contact.website],
                tel:[org.contact.tel]
              })
            });
        let orgFormData = new Organisation();
        orgFormData = this.organisationForm.value;
      } else if (this.activeConfiguration && this.activeConfiguration.organisation == null) { //for add new organisation
        this.configurationExists = false; 
        this.organisationForm = this.fb.group({
            name:['',Validators.required],
            orgtype:['',Validators.required],
            contact: this.fb.group({
              address:[''],
              email:['',[Validators.required, Validators.email]],
              website:[''],
              tel:['']
            })
          });        
      } else {
        console.log("Thre is no configuration created");
      }
    },
    (err=>{
      console.log(err);
    }));
  }

  ngOnDestroy(): void {
    if (this.ccSubsription != undefined) this.ccSubsription.unsubscribe();
  }

  delete(){
     const dialogRef = this.dialog.open(DialogOrganisationDelete,{
      data: this.activeOrganisation
    })

    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.organisationSrv.deleteOrganisation(this.activeOrganisation._id)
        .subscribe(res=>{
          this.dialog.open(DialogMessageConfirmation,{
            data: res.message
          })
          this.activeOrganisation = null;
          this.resetForm();
          this.configurationExists = false;
          this.customerConfigurationSrv.loadCC();
        })
      }
    })
  }

  update(){
     this.organisationSrv.updateOrganisation(this.activeOrganisation._id, this.organisationForm.value)
      .subscribe(result=>{
        if (result) {
          this.customerConfigurationSrv.loadCC();
        }
    });
  }

  save(){
    let orgFormData = new Organisation();
    orgFormData = this.organisationForm.value;
     this.organisationSrv.saveOrganisation(orgFormData).subscribe(result=>{

        this.activeOrganisation = result.data;
        this.customerConfigurationSrv.updateConfigurationOrganisation(JSON.parse(localStorage.getItem('cc'))._id,this.activeOrganisation._id);

        this.configurationExists = true;
        this.dialog.open(DialogMessageConfirmation,{
          data: result.message 
        })
        this.organisationForm.setValue({
          name:this.activeOrganisation.name,
          orgtype: this.activeOrganisation.orgtype,
          contact: this.activeOrganisation.contact
        })
        this.customerConfigurationSrv.loadCC();
      },
      err=>{
        console.log("Error during Organisation creation "+err);
      })
  }

  resetForm(){
    this.organisationForm.reset();
  }

}

@Component({
  selector: 'app-dialog-organisation-delete',
  templateUrl: './dialog-organisation-delete.component.html' 
})
export class DialogOrganisationDelete {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Organisation
  ) { }

}

@Component({
  selector: 'app-dialog-message-confirmation',
  templateUrl: './dialog-message-confirmation.component.html' 
})
export class DialogMessageConfirmation {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string
  ) { }

}