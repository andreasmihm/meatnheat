import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateRecipeComponent implements OnInit {

  constructor(
    private recipeService: RecipeService
  ) { }

  title:string;
  imageUrl:string;
  preperationTime:number;
  difficulty:number;

  ingredients:any = [
    {
      "Name": "Zwiebeln",
      "Amount": 1,
      "Unit": "Stk."
    }
  ]

  steps:any = [
    {
      "Type": "text",
      "Text": "Kartoffeln gründlich waschen und mit dem Meersalz in einen Topf geben. Topf mit Wasser auffüllen, bis die Kartoffeln vollständig bedeckt sind. Kartoffeln zugedeckt bei mittlerer Hitze ca. 20 Minuten kochen."
    }
  ]

  ngOnInit() {
  }

  addIngredient():void {
    this.ingredients.push({
      "Name": "",
      "Amount": "",
      "Unit": ""
    });
  }

  removeIngredient(index:number):void {
    this.ingredients.splice(index, 1);
  }

  addStep():void {
    this.steps.push({
      "Type":"text",
      "Text":""
    });
  }

  removeStep(index:number):void {
    this.steps.splice(index, 1);
  }

  createRecipe():void {

    const recipe = {
      "title": this.title,
      "imageUrl": this.imageUrl,
      "preperationTime": this.preperationTime,
      "Ingredients": this.ingredients,
      "steps": this.steps,
      "difficulty": this.difficulty
    };

    console.log("recipe: ",recipe);
    this.recipeService.createRecipe(recipe);
  }
}
