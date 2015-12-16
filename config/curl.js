module.exports = function(grunt, options) {

  console.log('Target is: '+grunt.option('target'));

  if (grunt.option('target') === 'dev') {
    // Test (using Schematic Ipsum)
    return {
      "bitbucket": {
        "src": {
          "url": "http://schematic-ipsum.herokuapp.com/",
          "method": "POST",
          "body": {
              "type": "object",
              "properties": {
                "scm": {"type":"string", "enum":["git", "svn"] },
                "has_wiki": {"type": "boolean" },
                "last_updated": {"type": "string", "format": "date-time" },
                "no_forks": {"type": "string", "enum": [null, "test"] },
                "created_on": {"type": "string", "format": "date-time" },
                "owner": {"type": "string", "ipsum": "word" },
                "logo": {"type": "string", "ipsum": "small image" },
                "email_mailinglist": {"type": "string", "enum": ["", "test"] },
                "is_mq": {"type": "boolean" },
                "size": {"type": "integer" },
                "read_only": {"type": "boolean" },
                "fork_of": {"type": "string", "enum": [null, "test"] },
                "mq_of": {"type": "string", "enum": [null, "test"] },
                "state": {"type": "string", "enum": ["creating", "created"] },
                "utc_created_on": {"type": "string", "format": "date-time" },
                "website": {"type": "string", "enum": ["","test"] },
                "description": {"type": "string", "enum": ["","test"] },
                "has_issues": {"type": "boolean" },
                "is_fork": {"type": "boolean" },
                "slug": {"type": "string", "ipsum": "id" },
                "is_private": {"type": "boolean" },
                "name": {"type": "string", "ipsum": "sentence" },
                "language": {"type": "string", "enum": ["","test"] },
                "utc_last_updated": {"type": "string", "format": "date-time" },
                "email_writers": {"type": "boolean" },
                "no_public_forks": {"type": "boolean" },
                "creator": {"type": "string", "enum": [null,"test"] },
                "resource_uri": {"type": "string", "format": "uri" }
              }
            },
          "json": true
        },
        "dest": "./log/bb-response.json"
      },
      "bugherd": {
        "src": {
          "url": "http://schematic-ipsum.herokuapp.com/?n=1",
          "method": "POST",
          "body": {
            "type": "object",
            "properties": {
              "project": {
                "type": "object",
                "properties": {
                  "id": { "type": "string", "ipsum": "id" },
                  "name": { "type": "string", "ipsum": "name" },
                  "devurl": { "type": "string", "format": "uri" },
                  "api_key": { "type": "string", "ipsum": "id" },
                  "is_guest": { "type": "boolean" },
                  "is_public": { "type": "boolean" },
                  "members": { "type": "array", "items": { "type": "string", "format":"email" } },
                  "guests": { "type": "array", "items": { "type": "string", "format":"email" } }
                }
              }
            }
          },
          "json": true
        },
        "dest": "./log/bh-response.json"
      }
    };
  } else {
    return {
      "bitbucket": {
        "src": {
          "url": "https://api.bitbucket.org/2.0/repositories/epiphanydevelopers/<%= pkg.client.string %>-<%= pkg.project.string %>",
          "method": "POST",
          "body": {
            "name": "<%= pkg.client.name %> - <%= pkg.project.name %>",
            "is_private": true,
            "scm": "git"
          },
          "json": true,
          "auth": {
            "username": "<%= secret.bitbucket.username %>",
            "password": "<%= secret.bitbucket.password %>",
            "sendImmediately": true
          }
        },
        "dest": "./log/bb-response.json"
      },
      "bugherd": {
        "src": {
          "url": "https://www.bugherd.com/api_v2/projects.json",
          "method": "POST",
          "body": {
            "project": {
              "name": "<%= pkg.client.name %> - <%= pkg.project.name %>",
              "devurl": "http://<%= pkg.client.string %>-<%= pkg.project.string %>.development.stratus.epiphanydev.co.uk",
              "is_active": true,
              "is_public": true
            }
          },
          "json": true,
          "auth": {
            "username": "<%= secret.bugherd.username %>",
            "password": "<%= secret.bugherd.password %>",
            "sendImmediately": true
          }
        },
        "dest": "./log/bh-response.json"
      }
    };
  }
};