const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req,res) {
      Thought.find({})
      .populate({
          path: 'reactions', 
          select: '-__v'})
      .select('-__v')
      // .sort({_id: -1})
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
  },
    // get one thought
    getThoughtById({params}, res) {
      Thought.findOne({ _id: params.id })
      .populate({
        path: 'reactions',
        select: '-__v'})
      .select('-__v')
      .then(dbThoughtData => {
          if(!dbThoughtData) {
          res.status(404).json({message: 'No thoughts found with this ID!'});
          return;
      }
      res.json(dbThoughtData)
      })
      .catch(err => {
          console.log(err);
          res.sendStatus(400);
      });
  },
    // createThought
    createThought(req, res) {
      console.log("word",req.body.userID)
      Thought.create(req.body)
        
      .then((thoughtData) => {
        console.log(thoughtData)
          return User.findOneAndUpdate({ _id: req.body.userID}, 
            {$push: {thought: thoughtData._id}}, {new: true});
      })

      // .then(({_id}) => {
      //   console.log(_id)
      //     return User.findOneAndUpdate({ _id: params.userId}, 
      //       {$push: {thought: _id}}, {new: true});
      // })
      .then(dbThoughtData => {
          if(!dbThoughtData) {
              res.status(404).json({message: 'No thoughts found with this ID!'});
              return;
          }
          res.json(dbThoughtData)
      })
      .catch(err => res.json(err)); 
  },
    // update thought by id
    updateThought({params, body}, res) {
      Thought.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
      .populate({
        path: 'reactions', 
        select: '-__v'})
      .select('-___v')
      .then(dbThoughtData => {
          if (!dbThoughtData) {
              res.status(404).json({message: 'No thoughts found with this ID!'});
              return;
          }
              res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },
    // delete thought
    deleteThought({params}, res) {
      Thoughts.findOneAndDelete({_id: params.id})
      .then(dbThoughtsData => {
          if (!dbThoughtsData) {
              res.status(404).json({message: 'No thoughts found with this ID!'});
              return;
          }
          res.json(dbThoughtsData);
          })
          .catch(err => res.status(400).json(err));
  },
    // Add a new Reaction
    addReaction({params, body}, res) {
      console.log(params)
      Thought.findOneAndUpdate({_id: params.thoughtId}, {$push: {reactions: body}}, {new: true, runValidators: true})
      .populate({
        path: 'reactions', 
        select: '-__v'})
      .select('-__v')
      .then(dbThoughtData => {
      if (!dbThoughtData) {
          res.status(404).json({message: 'No thoughts found with this ID!'});
          return;
      }
      res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err))

},

// Delete a reaction by ID
deleteReaction({params}, res) {
    Thought.findOneAndUpdate({_id: params.thoughtId}, {$pull: {reactions: {reactionId: params.reactionId}}}, {new : true})
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({message: 'No thoughts found with this ID!'});
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err));
}

};


module.exports = thoughtController;