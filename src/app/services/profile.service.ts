import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import {
  AuthenticationDetails,
  IAuthenticationDetailsData,
  CognitoIdentityServiceProvider,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  ICognitoUserPoolData,
  ICognitoUserData,
  ICognitoUserAttributeData
} from 'amazon-cognito-identity-js';
import * as CognitoIdentity from "aws-sdk/clients/cognitoidentity";
import { CookieService } from "../services/cookie.service";

@Injectable()
export class ProfileService {
  jwtToken:any;
  userPool:CognitoUserPool;

  poolData:ICognitoUserPoolData = {
    UserPoolId : 'eu-central-1_LaVer2K0o',
    ClientId : '5d9sc5ijad1fn4qimlqefb6ar5'
  };

  constructor(private cookieService:CookieService) {
    this.userPool = new CognitoUserPool(this.poolData);
    if(this.cookieService.getCookie("token")){
      this.jwtToken = this.cookieService.getCookie("token");
    }
  }

  signIn(username:string,password:string):void {
    const authenticationData:IAuthenticationDetailsData = {
      Username: username,
      Password: password
    }
    const authenticationDetails:AuthenticationDetails = new AuthenticationDetails(authenticationData);

    const cognitoUserData:ICognitoUserData = {
      Username: username,
      Pool: this.userPool
    }

    const cognitoUser:CognitoUser = new CognitoUser(cognitoUserData);
    cognitoUser.authenticateUser(authenticationDetails,{
      onSuccess: (result) => {
        console.log('access token + ' + result.getAccessToken().getJwtToken());
        this.jwtToken = result.getAccessToken().getJwtToken();
        this.cookieService.setCookie("token",this.jwtToken,365);
      },
      onFailure: (error) => {
        alert(error);
      }
    });
  }

  signUp(username:string,email:string,password:string):void{
    const emailData:ICognitoUserAttributeData = {
      Name: 'email',
      Value: email
    } 

    const emailAttribute:CognitoUserAttribute = new CognitoUserAttribute(emailData);
  };

  isLoggedIn():boolean {
    return !!this.jwtToken;
  }

}
