const { User } = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbSocialData => res.json(dbSocialData))
            .catch(err => {
              console.log(err);
              res.sendStatus(400);
            });
    },
    // get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
          .populate({
            path: 'thoughts',
            select: '-__v'
          })
          .select('-__v')
          .then(dbSocialData => res.json(dbSocialData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
    },
    // createUser
    createUser({ body }, res) {
    User.create(body)
      .then(dbSocialData => res.json(dbSocialData))
      .catch(err => res.json(err));
    },
    // update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
          .then(dbSocialData => {
            if (!dbSocialData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbSocialData);
          })
          .catch(err => res.json(err));
    },
    // delete user
    deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbSocialData => res.json(dbSocialData))
      .catch(err => res.json(err));
  }
};

module.exports = userController;
