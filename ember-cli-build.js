/* eslint-env node */
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    dotEnv: {
      clientAllowedKeys: [
        'FIREBASE_API_KEY',
        'FIREBASE_AUTH_DOMAIN',
        'FIREBASE_DATABASE_URL',
        'FIREBASE_STORAGE_BUCKET',
      ],
      path: {
        development: './config/.env.development',
      }
    },

    'ember-bootstrap': {
      'bootstrapVersion': 4,
      'importBootstrapFont': true,
      'importBootstrapCSS': false
    }
  });

  return app.toTree();
};
