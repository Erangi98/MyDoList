# MyDoList

#### _**IMPORTANT NOTE**_ - 
Please setup your mongodb connection according to the working enviroments.

## Getting Started
- local development: create a config file (make sure to name it config.js) in the config folder, which exports your db.uri connection. An example is provided, config/config.example.js. This file will be ignored by git so your db credentials will be kept safe when the app is deployed.
- production: Since the config file is not pushed when you deploy your app, you must specifiy your db uri in heorku. Set the uri in heroku as specified in [this](https://devcenter.heroku.com/articles/config-vars) resource. Make sure you name the environement variable "DB_URI". 

## The File structure
#### `client` - Holds the client application
#### `server` - Holds the server application

