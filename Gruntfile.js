module.exports = function(grunt) {

  // Dynamically load tasks
  require('matchdep').filterDev( 'grunt-*' ).forEach(grunt.loadNpmTasks);

  // Load from configs/ dir
  var configs = require('load-grunt-configs')(grunt);

  // Get contents of package.json
  configs.pkg = grunt.file.readJSON('package.json');

  // Load passwords etc.
  var findup = require('findup-sync');
  var secretPath = findup('secret.json', {nocase: true}); 
  
  if (secretPath == null)
  {
    grunt.fatal("Can't find secret.json")
  }
  
  configs.secret = grunt.file.readJSON(secretPath);

  grunt.initConfig(configs);

  // Custom tasks
  grunt.loadTasks('tasks');

  grunt.registerTask('default', []);
  // grunt.registerTask('default', ['updateContrib', 'bowerInstall', 'copy:bowerlibs', 'uglify:bowerlibs']);

  grunt.registerTask('bower',   'Pull bower packages and copy them across', ['bowerInstall', 'copy:bowerlibs', 'uglify:bowerlibs']);
  grunt.registerTask('setup',   'Setting up external sites and repositories', ['prompt', 'updatePkg', 'curl', 'updateBugherd', 'clean:setup', 'bower', 'resetGit']);
  grunt.registerTask('dev',     'Active development phase', ['express', 'compass', 'autoprefixer', 'open', 'watch']);
  grunt.registerTask('build-dev',     'Active development phase', ['compass', 'autoprefixer']);
  grunt.registerTask('build',   'General build task', ['compass', 'autoprefixer', 'clean:predist', 'copy:build', 'requirejs', 'cssmin', 'imagemin', 'clean:dist']);
  grunt.registerTask('stratus', 'Building for UAT and sending to Stratus', ['bump:minor', 'build', 'processhtml:stratus', 'sftp:stratus']);
  grunt.registerTask('live',    'Building for live distribution', ['bump:major', 'build', 'processhtml:dist']);
  grunt.registerTask('crtv',    'Building and sending to crtvcontent.com', ['live', 'sftp:crtv']);


};
