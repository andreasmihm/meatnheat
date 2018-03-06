import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RecipeDetailComponent implements OnInit {

  recipe:any;

  constructor(
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.requestRecipe();
  }

  requestRecipe(){
    this.recipeService.getRecipe("fc7e25f0-a91e-4bbd-941d-ed79b98790e6","1516568590567_7823819454475502_912036652144331_19568893761321227").subscribe((data) => {
      console.log("data:",data);
      this.recipe = data;
    });
  }

  getTitle(){
    if(!this.recipe) return null;
    return this.recipe.Title;
  }

  getAuthorName(){
    if(!this.recipe) return null;
    return this.recipe.Username;
  }

  getDifficulty(){
    if(!this.recipe) return null;
    return this.recipe.Difficulty;
  }

  getPreperationTime(){
    if(!this.recipe) return null;
    return this.recipe.PreperationTime;
  }

  getImage(){
    if(!this.recipe) return "https://erconsult.com.au/wp-content/uploads/2015/04/placeholder-600x400.png";
    return this.recipe.Image;
  }

  getSteps(){
    if(!this.recipe) return [];
    return this.recipe.Steps;
  }

  getIngredients(){
    if(!this.recipe) return [];
    return this.recipe.Ingredients;
  }
}
