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


# Git subtree workflow

## Get right *git* distro

According to [notice from git subtree author](https://github.com/apenwarr/git-subtree/blob/master/THIS-REPO-IS-OBSOLETE) git subtree is now part of
git since 1.7.11 version. Unfortunately last Mac OS has git version is 1.7.10 installed, so first we need to upgrade git.

Another issue is that currently (2013 March) not all distribution packages includes this optional feature, eg. recommended from
[official git site](http://git-scm.org) [package](http://git-scm.com/download/mac) does not include it :(

## (Optional) Install Homebrew itself

Most convenient way discovered now is working with [Homebrew](http://mxcl.github.com/homebrew/)

Please follow instructions to install Homebrew itself, if it was not done before.

    ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"

To check all is correct

    brew --version
    0.9.3

## Git install

    brew install git
    *** Downloading http://..../git-1.8.1.1.tar.gy
    ...
    (bear) /usr/local/Cellar/git/1.8.1 build in 56 seconds

At this point Homebrew promises:
    *Homebrew installs packages to their own directory and then symlinks their files into /usr/local.*

Sad on my Mac it is not true: git is installed but not linked to the ```/usr/local```

    git version
    1.7.10 // :@

No problem, let tune PATH variable to get Cellar's version of git precede:

Just open ~/.bash_profile via ```vim/mc/textedit``` or any other your prefered text editor
and add at the file end. Be careful about other PATH entries.

    export GIT_HOME="/usr/local/Cellar/git/1.8.1.1"
    export PATH=$GIT_HOME/bin:$PATH

Open new terminal window and

    git version
    1.8.1.1

    git subtree
    usage: git subtree add   --prefix=<prefix> <commit>
       or: git subtree merge --prefix=<prefix> <commit>
    .....

(party) Congrats, git meets our needs!



## Let go on with our repos...

    cd ~/dev/odesk/mobileweb #or whatever you like :)
    mkdir gitsubtree
    cd gitsubtree
    git clone git@github.com:olegtaranenko/mobileweb-server.git
    git clone git@github.com:olegtaranenko/mobileweb-client.git
    cd mobileweb-server

Note that folder client is already exists in the *server* repo, but it implicitly points to *mobileweb-client* repo.
To make link explicit

    git remote add client git@github.com:olegtaranenko/mobileweb-client.git
    git fetch client
    git subtree pull -P client -m "make link to client repo" client master
        From github.com:olegtaranenko/mobileweb-client
         * branch            master     -> FETCH_HEAD
        Merge made by the 'recursive' strategy.

Now both repos are properly linked and we can start working on the **mobileweb-client** project in **mobileweb-server/client** directory.

###Note: be careful! Below snippets might add/edit/delete files on working repo, which is not what you now want :D
###Just believe to our words you are not sure what are you doing!

    touch client/newClass.js
    git add .
    git commit -m "add new class to client"
    git push
    git subtree push -P client client master

Both repos have newClass.js added!

Imagine for some reason you have to change at the *client* repo first...

    cd ../mobileweb-client
    touch css/newCss.css
    git add .
    git commit -m "I like working with clients"
    git push
    cd ../mobileweb-server
    git subtree pull -P client client master

*server* repo got newCss.css file as well!


## Working with branches


    cd ../mobileweb-server
    git checkout jqmobi
    git subtree pull -P client client jqmobi

It is good practice to make same branches names to not get lost in the future, but nothing prevent to work so.
Moreover later by packaging *app* with Phonegap it will be a mainstream using.

# Feedback required!

Please send your feedback on any issues or misunderstanding to get this readme more polish. Thinking about other team mates!

