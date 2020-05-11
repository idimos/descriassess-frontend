import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user : User;
  step = 0;
  displayname:string;
  photoUrl:string= 'assets/defaultAvatar.png';

  constructor(
    private authsrv : AuthService,
  ) { 
    this.user = JSON.parse( localStorage.getItem('user'));
    this.displayname = this.user.displayName? this.user.displayName: "";
    this.photoUrl = this.user.photoURL? this.user.photoURL: this.photoUrl;
  }

  ngOnInit(): void { 
  
  }

  
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  updateDisplayName(){
    this.authsrv.updateProfile(this.displayname, this.photoUrl);
  }
}
