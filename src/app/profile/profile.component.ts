import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProfileService } from './../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {

  constructor(private profileService:ProfileService) { }

  signInUserName:string;
  signInPassword:string;

  signUpUserName:string;
  signUpEmail:string;
  signUpPassword:string;

  ngOnInit() {
  }

  signIn(){
    this.profileService.signIn(this.signInUserName,this.signInPassword);
  }

  signUp(){
    this.profileService.signUp(this.signUpUserName,this.signUpEmail,this.signUpPassword);
  }
}
