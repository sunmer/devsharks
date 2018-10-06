# Devsharks

This app showcases a service where developers sign up for doing code reviews, and are then matched with companies who need them.

The code showcases the Vue stack when built with TypeScript. Everything is neatly containerised and shows how to write clean and modular code which is simple to debug.

##Features
* Fully implemented in TypeScript
* VueJS, Vuex, Vue-Router used
* Vee-Validate for validation
* Webpack for watching and building
* VUE template files with SASS, TypeScript and HTML
* AXIOS for Ajax requests
* JSON server for persisting data

##How to install

* Install docker
* Install JSON server globally - https://github.com/typicode/json-server
* Run JSONServer with `json-server --watch db.json --routes routes.json`
* Go to /web folder and run `npm install`
* Go to root folder and run `docker-compose up`
* Access `localhost:8080` to see the app in action
