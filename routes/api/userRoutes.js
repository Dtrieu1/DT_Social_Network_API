const router = require('express').Router();
//all the information already gathered from controller
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend, 
  deleteFriend,
} = require('../../controllers/userController');

// /api/users -- this URL route for GET and POST
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId -- this URL route for GET a single user and DELETE 
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;
