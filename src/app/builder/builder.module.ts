import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialsModule } from "../materials.module";
import { BuilderRoutingModule } from './builder-routing.module';

import { MainComponent } from './main/main.component';
import { OrganisationComponent,DialogOrganisationDelete,DialogMessageConfirmation } from './organisation/organisation.component';
import { PeriodsComponent,DialogAddsubPeriod } from './periods/periods.component';
import { DepartmentsComponent } from './departments/departments.component';
import { CoursesComponent } from './courses/courses.component';
import { RubricsComponent } from './rubrics/rubrics.component';
import { StudentsComponent } from './students/students.component';
import { SubperiodComponent } from './periods/subperiod/subperiod.component';

@NgModule({
  declarations: [
    MainComponent, 
    OrganisationComponent, 
    PeriodsComponent, 
    DepartmentsComponent, 
    CoursesComponent, 
    RubricsComponent, 
    StudentsComponent,
    DialogOrganisationDelete,DialogMessageConfirmation, SubperiodComponent,DialogAddsubPeriod],
  imports: [
    CommonModule,
    BuilderRoutingModule,
    MaterialsModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule
  ],
  entryComponents: [
    DialogOrganisationDelete,DialogMessageConfirmation
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuilderModule { }
