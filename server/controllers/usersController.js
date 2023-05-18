
const User = require('../models/userModel');


exports.list = (req, res) =>
{
  res.send("NOT IMPLEMENTED: student list.");
}

exports.detail = (req, res) =>
{
  // TODO add test for deleted identity
  User.findById(req.user.id)
    .then((user) =>
    {
      return res.json({
        promo: user.promo,
        email: user.identity.email,
        univID: user.identity.univID,
        lastName: user.identity.lastName,
        firstName: user.identity.firstName,
      });
    })
    .catch((err) => res.status(404).json("user not found"));

}

exports.create_post = (req, res) =>
{
  res.send("NOT IMPLEMENTED: student create POST");
}


exports.delete_post = (req, res) =>
{
  res.send("NOT IMPLEMENTED: student delete POST");
}

exports.delete_get = (req, res) =>
{
  res.send("NOT IMPLEMENTED: student delete GET");
}


exports.update = (req, res) =>
{
  res.send("NOT IMPLEMENTED: student update POST");
}
