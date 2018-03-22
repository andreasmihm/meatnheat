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
  username:string;

  poolData:ICognitoUserPoolData = {
    UserPoolId : 'eu-central-1_LaVer2K0o',
    ClientId : '5d9sc5ijad1fn4qimlqefb6ar5'
  };

  constructor(private cookieService:CookieService) {
    this.userPool = new CognitoUserPool(this.poolData);
    if(this.cookieService.getCookie("token")){
      this.jwtToken = this.cookieService.getCookie("token");
    }
    if(localStorage.getItem("username")){
      this.username = localStorage.getItem("username");
    }
  }

  signIn(username:string,password:string,failure,success):void {
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
        console.log('access token + ' + result.getIdToken().getJwtToken());
        this.username = username;
        localStorage.setItem("username",this.username);
        this.jwtToken = result.getIdToken().getJwtToken();
        this.cookieService.setCookie("token",this.jwtToken,365);
        success();
      },
      onFailure: (error) => {
        alert(error);
        failure();
      }
    });
  }

  signUp(username:string,email:string,password:string,failure,success):void{
    const emailData:ICognitoUserAttributeData = {
      Name: 'email',
      Value: email
    } 

    const emailAttribute:CognitoUserAttribute = new CognitoUserAttribute(emailData);

    let attributeList:CognitoUserAttribute[] = [
      emailAttribute
    ];

    this.userPool.signUp(username,password,attributeList,null,(error,result) => {
      console.log(username,password,attributeList);
      if(error){
        alert(error);
        failure();
      }
      else {
        alert("Willkommen! Du hast eine email mit einem Aktivierungslink bekommen");
        success();
      }
    });
  };

  isLoggedIn():boolean {
    return !!this.jwtToken;
  }

  getUsername():string {
    return this.username || "";
  }

}