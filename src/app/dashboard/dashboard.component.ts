import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  constructor(private profileService:ProfileService) { }

  ngOnInit() {
  }

  isLoggedIn(){
    return this.profileService.isLoggedIn();
  }
}
