const UserModel = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.userRegister = async (req, res, next) =>  {
  console.log(req.body, 'req.body')
  const passwordHash = await bcrypt.hash(req.body.password, 10);
  const userData = {
    username: req.body.username,
    password: passwordHash,
  }
  const userRegister = await UserModel.create(userData);
  console.log(userRegister, 'userRegister')
  if(userRegister) {
    res.redirect('/user/login');
  } else {
    res.redirect('/user/register');
  }
}

exports.userLogin = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    if (user) {
      const comparePass = await bcrypt.compare(req.body.password, user.password);
      if (!comparePass) {
       return res.json({ err: "Login fail" })
      } else {
        let payload = {
          user_id: user.id,
          username: user.name,
        }
        const token = jwt.sign(payload, 'hungnv', {
          expiresIn: 36000
        });
        return res.json({ token: token, code: 200 })
      }
    } else {
      return res.json({ err: "Login fail" })
    }
  } catch (err) {
    console.log(err)
  }
}
