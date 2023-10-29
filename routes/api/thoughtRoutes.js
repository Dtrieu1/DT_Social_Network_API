const router = require('express').Router();
//all information gathered from thought controller
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction, 
  removeReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('thoughts/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions/reactionId
router.route('thoughts/:thoughtId/reactions/:reactionId').post(addReaction).delete(removeReaction);

module.exports = router;
