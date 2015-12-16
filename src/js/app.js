// Place third party dependencies in the vendor folder
//
// Configure loading modules from the vendor directory,
// except 'app' ones,
requirejs.config({
    "baseUrl": "/js/",
    "paths": {
      "app": "app",
      "jquery": [
		    "//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min",
		    "vendor/jquery.min"  // fallback to local version if CDN fails
      ],
      "bootstrap": "//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min",
      "fuse": "vendor/fuse.min",
      "bootbox": "vendor/bootbox",


      /* required for wysiwyg rtf textareas */
      "rangy": "vendor/rangy-core",
      "rangy-selectionsaverestore": "vendor/rangy-selectionsaverestore",
      "bootstrap.wysihtml5": "vendor/bootstrap3-wysihtml5.all",
      "bootstrap.wysihtml5.en-US": "vendor/bootstrap-wysihtml5.en-US"
    },
    "shim": {
      "bootstrap": {        
        deps: ["jquery", "rangy-selectionsaverestore"]
      },
      "rangy-selectionsaverestore" : {
        deps: ["rangy"]
      }
    },
    // Changing this to false strips out our comment too (set in 'wrap' in Gruntfile.js)
    preserveLicenseComments: true,
    findNestedDependencies: true

});

// Load the main app module to start the app
requirejs(["app/main"]);