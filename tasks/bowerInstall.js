/**
 * Run 'bower install'
 */
module.exports = function(grunt) {

  grunt.registerTask('bowerInstall', 'Install the Bower libraries', function() {

    var exec = require('child_process').exec;
    var done = this.async();

    // Install Bower libraries
    exec('bower install', function(err, stdout, stderr) {
      if (err) {
        console.log(stderr);
        grunt.fatal('Failed to install Bower libraries');
      }
      console.log(stdout);
      done();
    });


  });

};