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

  userPool:any;

  ngOnInit() {
    this.userPool
  }

  signIn(){
    console.log("blub: " + this.signInUserName + " / " + this.signInPassword);

    this.profileService.signIn(this.signInUserName,this.signInPassword);
  }
}
