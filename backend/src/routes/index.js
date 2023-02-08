const router = require('express').Router();
const videoRoute = require("./video.routes");

router.use("/videos", videoRoute)

module.exports = router;