import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { OrganisationComponent } from './organisation/organisation.component';
import { CoursesComponent } from './courses/courses.component';
import { DepartmentsComponent} from './departments/departments.component';
import { PeriodsComponent} from './periods/periods.component';
import { RubricsComponent} from './rubrics/rubrics.component';
import { StudentsComponent} from './students/students.component';

const routes: Routes = [
  { 
    path: 'builder', 
    component:  MainComponent,
      children:[
        { path: 'organisation', component:  OrganisationComponent},
        { path: 'periods', component:  PeriodsComponent},
        { path: 'courses', component:  CoursesComponent},
        { path: 'departments', component:  DepartmentsComponent},
        { path: 'students', component:  StudentsComponent},
        { path: 'rubrics', component:  RubricsComponent}
      ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuilderRoutingModule { }
