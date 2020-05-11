import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  user : firebase.User;
  signinForm: FormGroup;

  constructor(
    private authsrv : AuthService,
    private fb:FormBuilder
  ) { 
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.authsrv.getLoggedInUser().subscribe(( user =>{
      this.user = user;
    })
  )}

  signin(){
    this.authsrv.signIn(this.signinForm.controls.email.value, this.signinForm.controls.password.value);
  }

  signup(){
    this.authsrv.signUp(this.signinForm.controls.email.value, this.signinForm.controls.password.value);
  }

  signinwithgoogle(){
    this.authsrv.signInWithGoogle();
  }

}
