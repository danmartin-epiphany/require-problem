/**
 * Takes the values from Client Name and Package Name prompt
 * and update package.json, plus add user as contributor,
 * plus update Bitbucket URL and version number
 */
module.exports = function(grunt) {
  grunt.registerTask('updatePkg', 'Updating package.json with new values', function() {
    var pkg = grunt.file.readJSON('package.json'),
		secret = grunt.file.readJSON('secret.json'),
		client = grunt.config('client'),
		project = grunt.config('project');
	// Update name, client and project
    pkg.client = client;
    pkg.project = project;
    pkg.name = project.title;
    // Replace contributors with new user
    pkg.contributors = [{
        "name":secret.user.name,
        "email":secret.user.email
    }];
    // Update Bitbucket URL
    pkg.repository.url = "https://bitbucket.org/epiphanydevelopers/"+client.string+"-"+project.string+".git";
    // Reset version number
    pkg.version = "0.0.1";
    grunt.file.write('package.json', JSON.stringify(pkg, null, 2));
    // Update pkg var
    grunt.config('pkg', pkg);
  });
};