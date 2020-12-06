## _**PLEASE READ THIS TO COMPLETION BEFORE ASKING ANY QUESTIONS!**_

### _**IMPORTANT NOTES**_ - 
1. Never push anything from your node_modules folder to this repo. 
2. This project does not have a MongoDB connection setup.
- local development: create a config file (make sure to name it config.js) in the config folder, which exports your db.uri connection. An example is provided, config/config.example.js. This file will be ignored by git so your db credentials will be kept safe when the app is deployed.

## Run these commands to get started!

### `npm install`
### `npm install yarn -g`
### `cd server && npm install`
### `cd client && npm install`


## Getting Started
This project holds both the client application and the server application, so there will be node modules in multiple places. First, run `npm install` from the root. After this, you will run `cd server && npm install` and `cd client && npm install` from the root. 

Then you will want to create a config.js file in `/server/config` which will contain the MongoDB URI and JSONWebToken password. This file will be ignored by git so your credentials will be kept safe.

This app can be deployed directly to heroku since there is a script defined in package.json which will automatically handle building and deploying the app. For more information on deploying to heroku reference the extra resources at the bottom of this file. 


## Available Scripts

### `yarn workspace client start`

Runs just the client app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.


### `yarn workspace server start`

Runs just the server in development mode.<br>


### `yarn workspace server build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

If deploying to heroku this does not need to be run since it is handled by the heroku-postbuild script<br>

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## File structure
#### `client` - Holds the client application
- #### `public` - This holds all of our static files
- #### `src`
    - #### `assets` - This folder holds assets such as images, docs, and fonts
    - #### `components` - This folder holds all of the different components that will make up our views
    - #### `views` - These represent a unique page on the website i.e. Home or About. These are still normal react components
    - #### `App.js` - This is what renders all of our browser routes and different views
    - #### `index.js` - This is what renders the react app by rendering App.js, should not change
- #### `package.json` - Defines npm behaviors and packages for the client
#### `server` - Holds the server application
- #### `config` - This holds our configuration files, like mongoDB uri and JSON web token password
- #### `controllers` - These hold all of the callback functions that each route will call
- #### `middleware` - This is where we define the middleware which will protect selected routes.
- #### `models` - This holds all of our data models, namely our user model
- #### `routes` - This holds all of our HTTP to URL path associations for each unique url
- #### `server.js` - Defines npm behaviors and packages for the client
#### `package.json` - Defines npm behaviors like the scripts defined in the next section of the README
#### `.gitignore` - Tells git which files to ignore
#### `README` - This file!

## Learn More
To learn how to setup a local MongoDB instance for testing, check out how to [connect to MongoDB](https://docs.mongodb.com/guides/server/drivers/).

To learn how to deploy a full-stack web app to heroku, check out [this great guide](https://daveceddia.com/deploy-react-express-app-heroku/).

To learn React, check out the [React documentation](https://reactjs.org/).