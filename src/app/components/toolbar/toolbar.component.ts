import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  user : firebase.User;
  private defaultAvatarPath: string = 'assets/defaultAvatar.png';
  userAvatar : string = '';

  constructor(
    private authsrv:AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.authsrv.getLoggedInUser().subscribe(user=>{ 
      this.user = user;
      if (user)
        this.userAvatar = (this.user.photoURL) ? 'url('+this.user.photoURL+')' : 'url('+this.defaultAvatarPath+')';
    })
  }

  signout(){
    this.authsrv.signOut();
  }

  home(){
    this.router.navigate(['/']); 
  }

  dashboard(){ this.router.navigate(['dashboard']); }
  configure(){ this.router.navigate(['builder']);  }
}
