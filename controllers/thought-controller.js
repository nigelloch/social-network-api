const { Thought } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
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
    // get one thought
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
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
    // createThought
    createThought({ body }, res) {
        Thought.create(body)
          .then(dbSocialData => res.json(dbSocialData))
          .catch(err => res.json(err));
    },
    // update thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbSocialData => {
                if (!dbSocialData) {
                  res.status(404).json({ message: 'No thought found with this id!' });
                  return;
                }
                res.json(dbSocialData);
              })
              .catch(err => res.json(err));
        },
    // delete thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
          .then(dbSocialData => res.json(dbSocialData))
          .catch(err => res.json(err));
      }
}


module.exports = thoughtController;