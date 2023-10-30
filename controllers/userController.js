const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a user and associated apps
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: 'User and associated thoughts deleted!' })
    } catch (err) {
      res.status(500).json(err);
    }
  },

// Update a user by its _id
async updateUser (req, res) {
  try {
    const user = await User.findOneAndUpdate(
      //Finds the value and Update
      { _id: req.params.userId },
      {$set: req.body},
      {new: true});

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    // await Thought.updateMany({ _id: { $in: user.thoughts } });
    res.json({ message: 'User has now been updated!' })
  } catch (err) {
    res.status(500).json(err);
  }
},

// Post - To add a new friend to a user's friend list
// api/users[id]/friends/[friendid]
async addFriend (req, res) {
  try {
    const user = await User.findOneAndUpdate(
      //Finds the value and Update
      { _id: req.params.userId },
      { $addToSet: { friends: req.body.friendId} },
      {new: true});

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    // await Thought.updateMany({ _id: { $in: user.thoughts } });
    res.json({ message: 'Friend has now been added!' })
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
},

// Delete - To remove a friend from a user's friend list
async deleteFriend (req, res) {
  try {
    const user = await User.findOneAndUpdate(
      //Finds the value and Update
      { _id: req.params.userId },
      {$pull: {friends: req.params.friendId}},
      {new: true});
    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    // await Thought.updateMany({ _id: { $in: user.thoughts } });
    res.json({ message: 'Friend has now been removed!' })
  } catch (err) {
    res.status(500).json(err);
  }
},

};
