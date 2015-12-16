/**
 * Task to create new Bugherd project and updae inc/bugherd.html with correct API key
 */

module.exports = function(grunt) {
  grunt.registerTask('updateBugherd', 'Updating inc/bugherd.html with correctcode', function() {
    var bhFilepath = 'src/inc/bugherd.html',
		bhResponse = grunt.file.readJSON('log/bh-response.json'),
		bhOldContent = grunt.file.read(bhFilepath),
		bhNewContent = bhOldContent.replace('***api_key***', bhResponse[0].project.api_key);
	grunt.file.write(bhFilepath, bhNewContent);
  });
};