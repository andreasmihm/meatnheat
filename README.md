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
- Use cognitos "sub" attribute as identifier not "identityid", it should be unique and accessible in all important places (https://docs.aws.amazon.com/de_de/apigateway/latest/developerguide/apigateway-integrate-with-cognito.html)
- das nutzerbild sollte immer am selben pfad liegen damit man sich bei änderungen nicht um ein update der datenbank und aller caches kümmern muss
(wie geht man damit um wenn der user kein bild hochgeladen hat)


## Recipe Data Structure
{
  "RecipeId|Type": "test_recipe_id|recipe",
  "Title": "test title",
  "UserId": "test_user_id",
  "UserName":  "Max",
  "UserImage": "image_url",
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

## Elastic Search Recipes
- userid (for faster access)
- username (display in the search results)
- userimage (display in the search results)
- recipeid
- title
- image

## User Data for the next user pool

- email and phone logins
- first name
- last name
- picture