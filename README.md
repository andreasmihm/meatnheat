# Meatnheat

The next generation cooking platform. Developed using AWS services and a angular frontend.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Roadmap/Todos

- implement "sign up"
- refresh jwtToken
- follow other users
- Dashboard - recently viewed
- Dashboard - New Recipes (only from the bigger users)
- Menge der Zutaten pro Person berechnen
- implement Cooking Tutorials
- create a new user pool which allows email and phone logins

## Important Notes
- Zutaten sollten gruppierbar sein (z.B. Zutaten für die Beilage oder Zutaten für die Soße)
- Welche Zeitenangaben sind wichtig für den User ?


## Recipe Data Structure
{
  "RecipeId|Type": "test_recipe_id|recipe",
  "Title": "test title",
  "UserId": "test_user_id",
  "User": {
      "Name": "Max",
      "Image": "image_url"
  },
  "Image": "image_url",
  "PreperationTime": in_milliseconds,
  "Difficulty": 1-3,
  "Ingredients": [
      {
          "Amount": 1,
          "Unit": UNIT_ID,
          "Name": "INGREDIANT_NAME"
      },
      {
          "Amount": 100,
          "Unit": UNIT_ID,
          "Name": "INGREDIANT_NAME"
      }
  ],
  "Steps": [
      {
          "Type": "text",
          "Text": "Kartoffeln gründlich waschen und mit dem Meersalz in einen Topf geben. Topf mit Wasser auffüllen, bis die Kartoffeln vollständig bedeckt sind. Kartoffeln zugedeckt bei mittlerer Hitze ca. 20 Minuten kochen.
      }
  ]
}