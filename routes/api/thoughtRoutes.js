const router = require('express').Router();
//all information gathered from thought controller
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addTag,
  removeTag,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;
