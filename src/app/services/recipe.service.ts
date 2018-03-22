import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ProfileService } from './profile.service';

@Injectable()
export class RecipeService {

  constructor(
    private http: HttpClient,
    private profileService: ProfileService
  ) { }

  getRecipe(userid,recipeid):any {
    const body:any = {
      'UserId': userid,
      'RecipeId': recipeid
    }

    return this.http.post("https://d6unnq9nxg.execute-api.eu-central-1.amazonaws.com/prod/getrecipe",body);
  }

  createRecipe(recipe:any,failure,success):void {
    if(this.profileService.isLoggedIn()){
      const httpOptions = {
        headers: new HttpHeaders({ 
          //'Content-Type': 'application/json',
          'Authorization': this.profileService.jwtToken
        })
      };

      const body:any = {
        'recipe': recipe
      };
      
      this.http.put("https://d6unnq9nxg.execute-api.eu-central-1.amazonaws.com/prod/createrecipe",body,httpOptions).subscribe(data => {
        console.log("createRecipeResponce: ",data);
        success();
      },(error) => {
        // error  
        alert(error.error.message);
        console.log("error");
        failure();
      });
    }
    else {
      //todo: implement proper error handling
      alert("error: login to create a recipe");
    }
  }
}
