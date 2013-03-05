Mobile Web Project
==================

Mobile Web application is created based on following stack:

  * NodeJS/Express as the web server
  * RequireJS with Shim plugin as a AMD loader
  * BackboneJS as a MVC implementation
  * jQueryMobile/jQuery as a client framework/rendering engine
  * Underscore template subsystem
  * LESS as a CSS generator

Project basically is developed as a proof-of-concept according to the *Bootcamp technical specification*.

## Install and run

After clone to folder mobileweb use

    cd mobileweb
    npm install
    node server.js

Type in browser to startup

    localhost:8001


## Basics

Client-side javascript libraries and resources are located in folder `client`. During booting all files are loading to the browser, after there client calls ajax REST api to get threads info.

Server side is done also here and implemented via static mocking json files. They are located in folder `client/api/v0`, where API url is: [/api/v0/threads](http://localhost/api/v0/threads) 

The application is accomplished taking care about modularity and concern separation.

All library or work project file is treated as a separate module. To load modules has been using AMD technique as it described at [RequireJs](http://requirejs.org/docs/whyamd.html) site. To handle mutual dependencies between libraries [Shim plugin](http://requirejs.org/docs/api.html#config-shim) is in charge.
Templates are loading via [RequireJS text plugin](http://requirejs.org/docs/api.html#text).

To get CSS tuning the LESS is selected. Sources are located at `client/less/css` folder and compiled every time the node server started. 

    WARNING! This is very convinient for development but for production use it has to be fixed.



