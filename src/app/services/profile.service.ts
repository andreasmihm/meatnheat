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
  ICognitoUserData
} from 'amazon-cognito-identity-js';
import * as CognitoIdentity from "aws-sdk/clients/cognitoidentity";

@Injectable()
export class ProfileService {

  userPool:CognitoUserPool;

  poolData:ICognitoUserPoolData = {
    UserPoolId : 'eu-central-1_LaVer2K0o',
    ClientId : '5d9sc5ijad1fn4qimlqefb6ar5'
  };

  constructor() {
    this.userPool = new CognitoUserPool(this.poolData);
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
      onSuccess: function(result){
        console.log('access token + ' + result.getAccessToken().getJwtToken());
      },
      onFailure: function(error){
        alert(error);
      }
    });
    
  }

}
