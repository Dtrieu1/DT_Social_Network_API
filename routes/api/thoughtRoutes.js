const router = require('express').Router();
//all information gathered from thought controller
const {
  getApplications,
  getSingleApplication,
  createApplication,
  updateApplication,
  deleteApplication,
  addTag,
  removeTag,
} = require('../../controllers/thoughtController');

// /api/applications
router.route('/').get(getApplications).post(createApplication);

// /api/applications/:applicationId
router
  .route('/:thoughtId')
  .get(getSingleApplication)
  .put(updateApplication)
  .delete(deleteApplication);

// /api/applications/:applicationId/tags
router.route('/:thoughtId/tags').post(addTag);

// /api/applications/:applicationId/tags/:tagId
router.route('/:thoughtId/tags/:tagId').delete(removeTag);

module.exports = router;
