const jwt = require('jsonwebtoken');

function check_authen(req, res, next) {
  const token = req.body["access_token"];
  if (token) {
    jwt.verify(token, 'hungnv', (err, decode) => {
      if(err) {
        return res.json({err: "Token unauthotized"})
      } else {
        req.decode = decode;
        next();
      }
    })
  } else {
    return res.json({err: "Token unauthotized"})
  }
}

module.exports = check_authen;