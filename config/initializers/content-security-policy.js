module.exports = (process) => {
  return {
    'default-src': [
      "'self'"
    ],
    'script-src': [
      "'self'",
      "'unsafe-eval'",
      "'unsafe-inline'",
      "apis.google.com",
    ],
    'frame-src': [
      "'self'",
      "https://*.firebaseapp.com",
    ],
    'connect-src': [
      "'self'",
      "wss://*.firebaseio.com",
      "https://*.googleapis.com",
      "https://*.cloudfunctions.net"
    ],
    'style-src': [
      "'self'",
      "'unsafe-inline'"
    ],
    'img-src': [
      "'self'",
      "*.appspot.com",
    ]
  };
}
