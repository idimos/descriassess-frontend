import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  emailform: FormGroup;

  constructor(
    private authsrv : AuthService,
    private fb:FormBuilder
  ) {
    this.emailform = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
  }

  sendForgotPasswordLink(){
    this.authsrv.sendForgotPasswordLink(this.emailform.controls.email.value); 
  }
}
