import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as AWS from 'aws-sdk';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }

}
