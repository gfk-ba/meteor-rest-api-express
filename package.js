Package.describe({
  name: 'gfk:rest-api-express',
  summary: 'Extends rest-api-base and injects middleware npm dependencies ',
  version: '0.1.0',
  git: ' /* Fill me in! */ '
});

Npm.depends({
    'express': '4.10.3',
    'body-parser': '1.9.3'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use('gfk:rest-api-base@0.1.0', 'server');
  api.addFiles('gfk:rest-api-express.js', 'server');
  api.export('RestApi');
});
