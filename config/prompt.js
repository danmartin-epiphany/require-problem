module.exports = function(grunt, options) {
  return {
    target: {
      options: {
        questions: [{
          config: 'client',
          type: 'input',
          message: 'Client name',
          validate: function(value) {
            if (value === '') {
              return 'Please enter a client name';
            }
            return true;
          },
          filter:  function(value) {
            // Return Client Name and client-name
            var c = value.split(' '),
                i = 0,
                l = c.length,
                n = [],
                s = [];
            for (;i < l; i++) {
              n[i] = c[i].substr(0,1).toUpperCase()+c[i].substr(1);
              s[i] = c[i].toLowerCase();
            }
            return {
              "name" : n.join(' '),
              "string" : s.join('-')
            };
          }
        },
        {
          config: 'project',
          type: 'input',
          message: 'Project name',
          validate: function(value) {
            if (value === '') {
              return 'Please enter a project name';
            }
            return true;
          },
          filter:  function(value) {
            // Return ProjectName, Project Name and project-name
            var p = value.split(' '),
                i = 0,
                l = p.length,
                n = [],
                s = [];
            for (;i < l; i++) {
              n[i] = p[i].substr(0,1).toUpperCase()+p[i].substr(1);
              s[i] = p[i].toLowerCase();
            }
            return {
              "name" : n.join(' '),
              "title" : n.join(''),
              "string" : s.join('-')
            };
          }
        }]
      }
    }
  };
};