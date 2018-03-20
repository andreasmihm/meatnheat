import { Injectable,OnDestroy } from '@angular/core';
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
  ICognitoUserAttributeData,
  CognitoIdToken,
  CognitoUserSession,
  ICognitoUserSessionData
} from 'amazon-cognito-identity-js';
import * as CognitoIdentity from "aws-sdk/clients/cognitoidentity";
import { CookieService } from "../services/cookie.service";
import { setInterval } from 'timers';

@Injectable()
export class ProfileService implements OnDestroy{
  jwtToken:any; //depricated: use idToken.getJwtToken()
  idToken:CognitoIdToken;
  userSession:CognitoUserSession;
  userPool:CognitoUserPool;
  cognitoUser:CognitoUser;
  userName:string;
  refreshInterval:any;

  poolData:ICognitoUserPoolData = {
    UserPoolId : 'eu-central-1_LaVer2K0o',
    ClientId : '5d9sc5ijad1fn4qimlqefb6ar5'
  };

  constructor(private cookieService:CookieService) {
    this.userPool = new CognitoUserPool(this.poolData);
    console.log("initialized userservice");
    if(localStorage.getItem("userSession")){
      this.userSession = JSON.parse(localStorage.getItem("userSession"));
      this.userName = localStorage.getItem("username");
      
      /*
      this.userSession = JSON.parse(this.cookieService.getCookie("userSession"));
      this.userName = this.cookieService.getCookie("username");
      */

      this.refreshSession();
      this.startRefreshInterval();
    } 
  }

  ngOnDestroy() {
    if(this.refreshInterval){
      clearInterval(this.refreshInterval);
    }
  }

  refreshSession(){
    const cognitoUserData:ICognitoUserData = {
      Username: this.userName,
      Pool: this.userPool
    }

    const cognitoUser:CognitoUser = new CognitoUser(cognitoUserData);
    
    
    cognitoUser.refreshSession(this.userSession.getRefreshToken(),(err,result) => {
      if(err){
        console.error(err);
      }

      console.log("refresh: ",JSON.stringify(result));
      this.userSession = result;
      localStorage.setItem("userSession",JSON.stringify(this.userSession));
      //this.cookieService.setCookie("userSession",JSON.stringify(this.userSession),365);
    });
  }

  startRefreshInterval() {
    if(this.userName){
      this.refreshInterval = setInterval(() => {
        this.refreshSession();
      },1000 * 60 * 10) // @TODO: check the duration of the old one
                        // token duration is something around 1 hour
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
        console.log('userSession: ' + JSON.stringify(result));
        
        // store the username if the login with it worked
        this.userName = username;
        this.userSession = result;


        localStorage.setItem("userSession",JSON.stringify(this.userSession));
        localStorage.setItem("username",this.userName);
        
        /*
        this.cookieService.setCookie("userSession",JSON.stringify(this.userSession),365);
        this.cookieService.setCookie("username",this.userName,365);
        */

        this.startRefreshInterval();
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

    let attributeList:CognitoUserAttribute[] = [
      emailAttribute
    ];

    this.userPool.signUp(username,password,attributeList,null,(error,result) => {
      console.log(username,password,attributeList);
      if(error){
        alert(error);
      }
      else {
        alert("Willkommen! Du hast eine email mit einem Aktivierungslink bekommen");
      }
    });
  };

  isLoggedIn():boolean {
    return !!this.userSession;
  }

}
