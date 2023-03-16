const {Thought, User} = require('../models');

const thoughtController = {


  getAllThoughts(req, res) {
    Thought.find({})
    .then((Thoughts) => res.json(Thoughts))
    .catch((err) => {
      console.error({ message: err });
      return res.status(500).json(err);
    }
    );
  },


  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
    .then((Thoughts) =>
      !Thoughts
        ? res.status(404).json({ message: 'No Thoughts with that ID' })
        : res.json(Thoughts)
    )
    .catch((err) => {
      console.error({ message: err });
      return res.status(500).json(err);
    }
    );
  },


  createThought(req, res) {
    Thought.create(req.body)
    .then((Thought) => {
     return User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: Thought._id } },
        { new: true }
      );
    })
    
    .then((User) => {
      !User
        ? res.status(404).json({ message: 'No User with that ID' })
        : res.json(User);
    })
    .catch((err) => res.status(500).json(err));
  },


  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true }
    )
    .then((Thoughts) =>
      !Thoughts
        ? res.status(404).json({ message: 'No Thoughts with that ID' })
        : res.json(Thoughts)
    )
    .catch((err) => res.status(500).json(err));
  },
  

  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
    .then((Thoughts) =>
      !Thoughts
        ? res.status(404).json({ message: 'No Thoughts with that ID' })
        : res.json(Thoughts)
    )
    .catch((err) => res.status(500).json(err));
  },


  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )

    .then((thoughts) =>
      !thoughts
        ? res.status(404).json({ message: 'No Thoughts with that ID' })
        : res.json(thoughts)
    )
    .catch((err) => res.status(500).json(err));
  },


  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
    .then((Thoughts) =>
      !Thoughts
        ? res.status(404).json({ message: 'No Thoughts with that ID' })
        : res.json(Thoughts)
    )
    .catch((err) => res.status(500).json(err));
  }
};

module.exports = thoughtController;