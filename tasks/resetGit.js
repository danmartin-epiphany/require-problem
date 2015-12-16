/**
 * Clear the Boilerplate Git project and intialise new one
 * Then add files as new remote
 */
var exec = require('child_process').exec;

module.exports = function(grunt) {

  grunt.registerTask('resetGit', 'Set up new Git repository', function() {

    var done = this.async();
    var queue = [];
    var next = function() {
      console.log('Tasks remaining: '+queue.length);
      if (!queue.length) {
        return done();
      }
      queue.shift()();
    };

    // Initialise new git repo
    queue.push(function(){
      exec('git init', function(err, stdout, stderr){
        if (err) {
          console.log(stderr);
          grunt.fatal('Failed to initialise new repo');
        }
        console.log(stdout);
        next();
      });
    });

    // Add Bitbucket repo
    queue.push(function(){
      var pkg = grunt.file.readJSON('package.json'),
          secret = grunt.file.readJSON('secret.json'),
          url = pkg.repository.url,
          repo = url.substr(0,8)+escape(secret.bitbucket.username)+':'+escape(secret.bitbucket.password)+'@'+url.substr(8);
      exec('git remote add origin '+repo, function(err, stdout, stderr){
        if (err) {
          console.log(stderr);
          grunt.fatal('Failed to add Bitbucket remote');
        }
        console.log(stdout);
        next();
      });
    });

    // Add all the files
    queue.push(function(){
      exec('git add .', function(err, stdout, stderr){
        if (err) {
          console.log(stderr);
          grunt.fatal('Failed to add files to commit');
        }
        console.log(stdout);
        next();
      });
    });

    // Commit current files
    queue.push(function(){
      exec('git commit -am "Initial commit. Get cracking!"', function(err, stdout, stderr){
        if (err) {
          console.log(stderr);
          grunt.fatal('Failed to commit');
        }
        console.log(stdout);
        next();
      });
    });

    // Push current files up to repo
    queue.push(function(){
      exec('git push -u origin master', function(err, stdout, stderr){
        if (err) {
          console.log(stderr);
          grunt.fatal('Failed to get status');
        }
        console.log(stdout);
        next();
      });
    });

    next();

  });
};