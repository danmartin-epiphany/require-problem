/**
 * Takes the values from Client Name and Package Name prompt
 * and update package.json, plus add user as contributor,
 * plus update Bitbucket URL and version number
 */
module.exports = function(grunt) {
  grunt.registerTask('updateContrib', 'Updating package.json with new user', function() {
    var pkg = grunt.file.readJSON('package.json'),
		secret = grunt.file.readJSON('secret.json');
    // Add contributor if not already there
    var isContributor = false,
        contributorsCount = pkg.contributors.length;
    pkg.contributors.forEach(function(value, i) {
        if (pkg.contributors[i].email == secret.user.email) {
            isContributor = true;
        }
        if (i == contributorsCount-1 && !isContributor) {
            pkg.contributors.push({
                "name":secret.user.name,
                "email":secret.user.email
            });
        }
    });
    grunt.file.write('package.json', JSON.stringify(pkg, null, 2));
    // Update pkg var
    grunt.config('pkg', pkg);
  });
};