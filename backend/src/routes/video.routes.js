const router = require("express").Router();
const validate = require("../middlewares/validate");
const videoValidation = require("../validations/video.validation");
const videoController = require("../controllers/video.controller");

router.get("/", validate(videoValidation.getVideos), videoController.getVideos);
router.get(
  "/:videoId",
  validate(videoValidation.getVideoById),
  videoController.getVideoById
);
router.post("/", validate(videoValidation.postVideo), videoController.postVideo);
router.patch("/:videoId/votes",validate(videoValidation.patchVotes), videoController.patchVotes);
router.patch("/:videoId/views", validate(videoValidation.patchViews), videoController.patchViews);

module.exports = router;
