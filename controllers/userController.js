const {User} = require('../models');

const userController = { 


getAllUsers(req, res) {
  User.find({})
  .then((Users) => res.json(Users))
  .catch((err) => {
    console.error({ message: err });
    return res.status(500).json(err);
  });
},


getUserById(req, res) {
  User.findOne({ _id: req.params.userId })
  .populate({
    path: 'thoughts',
    select: '-__v'
  })
  .populate({
    path: 'friends',
    select: '-__v'
  })
  .then((User) => 
    !User
          ? res.status(404).json({ message: 'No User found' })
          : res.json(User)
      )
  .catch((err) => {
    console.error({ message: err });
    return res.status(500).json(err);
  });
},


createUser(req, res) {
  User.create(req.body)
  .then((User) => res.json(User)) 
  .catch((err) => res.status(500).json(err));
},


addFriend(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $addToSet: { friends: req.params.friendId } },
    { new: true }
  )
  .then((User) =>
    !User
          ? res.status(404).json({ message: 'No User found' })
          : res.json(User)
      )
  .catch((err) => res.status(500).json(err));
},


deleteUser(req, res) {
  User.findOneAndDelete({ _id: req.params.userId })
  .then((User) => 
    !User
          ? res.status(404).json({ message: 'No User found' })
          : res.json(User)
      ) 
  .catch((err) => res.status(500).json(err));
},


updateUser(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $set: req.body},
    { new: true }
  )
  .then((User) => 
    !User
          ? res.status(404).json({ message: 'No User with that ID' })
          : res.json(User)
      ) 
  .catch((err) => res.status(500).json(err));
},


deleteFriend(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $pull: { friends: req.params.friendId } },
    { new: true }
  )
  .then((User) =>
    !User
          ? res.status(404).json({ message: 'No User found' })
          : res.json(User)
      )
  .catch((err) => res.status(500).json(err));  
}
};

module.exports = userController;