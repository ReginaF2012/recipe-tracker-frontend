This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Recipe-Tracker-Frontend Overview
Recipe-Tracker is a virtual recipe box. Users can perform all CRUD actions on recipes that they have submitted and view the recipes submitted by other users. Created with React.js, utilizes redux and redux-thunk middleware. 

Designed to communicate with [this Rails API backend](https://github.com/ReginaF2012/recipe-tracker-backend). Once you have followed the instructions on that repo to get the backend server configured and up and running you can start the installation process of this app.

# Live App
[recipe-tracker-frontend hosted on heroku](https://recipe-tracker-frontend.herokuapp.com/recipes)

## Installation
Fork and Clone this repo

```
$ git clone https://github.com/ReginaF2012/recipe-tracker-frontend
```
Install node packages
```
$ yarn install
```
In `/src/actions/usersActions.js` and `/src/actions/recipesActions.js` change the `const URL` variables to the url that your Rails API server is running on. Example:
```
//recipesAction.js
...
const URL = "https://localhost:3001/api/v1/recipes"
...
```

Note the /api/v1 at the end of the urls. This is because of the namespacing of the controllers on the backend.

After you've changed to the correct urls and installed the node packages run
```
$ yarn start
```
to start the frontend server on (http://localhost:3000/)


## Usage
Once the frontend and backend servers are communicating 
- There is sign up login/logout functionality utilizing JWT
- Users can perform full CRUD actions on the recipes they submit
- Users can view recipes submitted by other users
- There is a search bar to search through all submitted recipes by title

## License

[MIT License](https://opensource.org/licenses/MIT).