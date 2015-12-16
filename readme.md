# Node/Bower/Grunt/Require Project Boilerplate

## Starting point for project using Node, Bower, Grunt and Require.

####Nodejs
This boilerplate is structured around several nodejs tools, which aim to reduce repetitive dev tasks and improve page load times of your final product by using concatenation, minification and image compression by default. It will also give you auto-prefixing on every save of your CSS and allow livereload of the page whenever you save in your editor.

####Bower
A package manager created by Twitter. It can save time when pulling together all the libraries and front end tools that you repeatedly use across all your projects. It also ensures that each time you start a new project you are always using the most up to date versions of these libraries (where appropriate, you can also keep track of particular relases such as jQuery 1.10.* if you are still supporting IE7).

####Grunt
Introduce a build process to easily deliver linted, concatenated, minified CSS and JavaScript files. Also compress your images to further reduce your page load times.

####RequireJS
Asynchronous AMD script loader to reduce dependency complications across your Javascripts and reduce page blocking script loads.

### Set up your dev environment

You can see how to set up your environment [on the wiki](http://wiki.stratus.epiphanydev.co.uk/index.php/Setting_Up_Your_Development_Environment).

The first thing to do is to clone this repository into a new folder, if you haven't already done so.

```
git clone https://your_name@bitbucket.org/epiphanydevelopers/grunt-boilerplate.git client-name-project-name
```

Now have a look at the project structure. The "src" directory is where all your application code will live as you develop.

You will also see a package.json file. This file outlines all of the dev dependencies required by the project to run. These are mostly Grunt plugins, but any Node modules can be listed in there.

```js
  "devDependencies": {
    "express": "~3.4.0",
    "connect-livereload": "~0.3.0",
    "grunt": "~0.4.1",
    "grunt-contrib-concat": "~0.3.0",
    "grunt-contrib-uglify": "~0.2.4",
    "grunt-contrib-watch": "~0.5.3",
    "grunt-autoprefixer": "~0.3.0",
    "grunt-contrib-cssmin": "~0.6.2",
    "grunt-contrib-copy": "~0.4.1",
    "grunt-contrib-imagemin": "~0.3.0",
    "grunt-contrib-clean": "~0.5.0",
    "grunt-express-server": "~0.4.3",
    "grunt-open": "~0.2.2"
  }
```

To install all of these you just need to issue a "npm install" command from the root of the project and everything on the above list should install automatically...

```js
npm install
```

The root of the project also contains a file called bower.json which outlines all the library dependencies that the boilerplate project uses (Modernizr, jQuery and Require.js). Add any Bower components that your project needs here. If you do this you'll also need to update the Grunt copy command to ensure the components are copied over to the correct directory.

```js
  "dependencies": {
    "modernizr": "latest",
    "requirejs": "latest",
    "jquery": "~1.10.*"
  }
```

### Set up your project

First, change the name of 'secret_sample.json' to secret.json, and enter your details (or, better, copy your "secret.json" from a previous project).

**If you are setting up the project from new**, run a "grunt setup" command.

This will do the following:

* Prompt you for a Client name and Project name. These will be used for the rest of the setup.
* Update your package.json file with these new variables
* Set up a Bitbucket repository and a Bugherd project, and update the Bugherd code to be included on Stratus
* Install, copy and minify all the jQuery, Modernizr and Require libraries across from the bower_components folder and into your src/js/vendors folder.
* Clear the .git folder and add your files as a new remote for the newly-created Bitbucket repo

```js
grunt setup
```

**If you are continuing work on a project that has already been started**, simply run "grunt default" (or "grunt"). This only does the fourth stage of the setup, i.e. installing, copying and minifying the Bower components that your project needs, and adding you as a contributor.

```js
grunt
```

### Begin dev

You will now be ready to go. To start up your node server, and automatically open up a browser window to see your index.html, just issue the "grunt dev" command...

```js
grunt dev
```

### Which CSS and JS files do I edit?

You should write all your CSS in src/sass/screen.scss. If you've not used SASS before, don't worry, just write normal CSS and you'll be fine.

Grunt generates an autoprefixed styles.css file every time screen.scss is saved. The browser will automatically inject the updated CSS without a page reload on save.

Your JavaScript code should be written using the AMD pattern with files being saved to the js/app folder. All vendor scripts should be installed with bower and copied across to the "js/vendor" folder by adding them to the grunt *copy:bowerlibs* task.

Require will load your scripts asynchronously from the js/app.js entry point file. More information about doing things the Require way is available on [requirejs.org](http://requirejs.org/docs/api.html)

Saving any HTML file will also cause a browser refresh automatically.

### Testing your project on Stratus

When your project is finished and you want to test it on our dev server (stratus.epiphanydev.co.uk) run the grunt command

```js
grunt stratus
```

This creates a new "dist" folder (or overwrites the existing one) in the root of your project with all of your code. Your CSS and JavaScripts will be concatenated and minified (we still keep Modernizr seperate as we want that to load before the body). It will also add the Bugherd code.

It will then upload the contents of the dist folder to the ```/var/www/html/development/client-name-project-name``` directory on Stratus. You will need to SSH on to the box and run the newDevSite.sh script in order to set up the Virtual Host. Remember to use the ```client-name-project-name``` format.

**N.B. This is a non-destructive upload, so if you have lots of additional images or scripts or stylesheets on Stratus, they will still be on the server. This shouldn't cause a problem, but in general be a good housekeeper and tidy as you go.**

### Building your project

When your project is finished and you want to package everything up to send to the client, you should run the following grunt command.

```js
grunt live
```

This creates a new "dist" folder (or overwrites the existing one) in the root of your project with all of your production ready code. Your CSS and JavaScripts will be concatenated and minified (we still keep Modernizr seperate as we want that to load before the body). It will also optimise all your images by compressing pngs and gifs. It will add the social media scripts for Facebook, Twitter and Google Plus One at the foot of the page, and Google Analytics code at the top (you can remove the social scripts include if they are not needed). **N.B. You will need to manually enter the Analytics ID in src/inc/analytics.html.**

The dist folder can then be zipped and sent over to the client.

If you are uploading it to crtvcontent.com, run the following

```js
grunt crtv
```

This runs the same process as ```grunt live``` but in addition uploads it to ```/var/www/html/client-name-project-name.crtvcontent.com``` on our Rackspace server. You will need to SSH on to the box to set up a virtual host for the site (look in /etc/httpd/conf.d/virtualhosts).

##TO DO
* You have to run newDevSite.sh before doing ```grunt stratus``` or else it will fail when you try and run it when the dir already exists.
* Clear readme.md and update with Client/Project names
* Add link to the Style Guides from the Wiki
* Automate VHosts setup on Stratus, delete contents of folder before upload
* Set up crtvcontent.com VHosts and delete contents of folder before upload
* Do we want bump to commit/tag and push?
* Archive process for Stratus (to link with the Bash scripts)
* Add line to hosts file (Not possible and hard to do consistently across Windows and OSX. Maybe use xip.io or get Greeno to add something that resolves any .local address to 127.0.0.1)
* Set express to open at client-name-project-name.local (or xip.io or wherever) ?
* Add URLs to readme (local, stratus, crtvcontent.com)
* Live task zips up contents of dist folder and renames ClientName_ProjectName_yyyymmdd-HHMM