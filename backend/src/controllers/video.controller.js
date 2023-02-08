const catchAsync = require("../utils/catchAsync");
const videoServices = require("../services/videos.services");

const getVideos = catchAsync(async (req, res) => {
  try {
    const { query } = req;
    const videos = await videoServices.getVideos(query);
    res.status(200).send({ videos: videos });
  } catch (err) {
    const { statusCode, message } = err;
    if (!statusCode)
      return res.status(500).send({ message: "Internal server Error" });
    res.status(statusCode).send({ statusCode, message });
  }
});

const getVideoById = catchAsync(async (req, res) => {
  try {
    const { videoId } = req.params;
    const video = await videoServices.getVideoById(videoId);
    console.log(video)
    res.status(200).send(video);
  } catch (err) {
    const { statusCode, message } = err;
    if (!statusCode)
      return res.status(500).send({ message: "Internal server Error" });
    res.status(statusCode).send({ statusCode, message });
  }
});

const postVideo = catchAsync(async (req, res) => {
  try {
    const { body } = req;
    const video = await videoServices.postVideo(body);
    console.log(video);
    res.status(201).send(video);
  } catch (err) {
    const { statusCode, message } = err;
    if (!statusCode)
      return res.status(500).send({ message: "Internal server Error" });
    res.status(statusCode).send({ statusCode, message });
  }
});

const patchVotes = catchAsync(async (req, res) => {
  try {
    const { videoId } = req.params;
    const { vote, change } = req.body;
    await videoServices.patchVotes(videoId, vote, change);
    res.sendStatus(204);
  } catch (err) {
    const { statusCode, message } = err;
    if (!statusCode)
      return res.status(500).send({ message: "Internal server Error" });
    res.status(statusCode).send({ statusCode, message });
  }
});

const patchViews = catchAsync(async (req, res) => {
  try {
    const { videoId } = req.params;
    await videoServices.patchViews(videoId);
    res.sendStatus(204);
  } catch (err) {
    const { statusCode, message } = err;
    if (!statusCode)
      return res.status(500).send({ message: "Internal server Error" });
    res.status(statusCode).send({ statusCode, message });
  }
});

module.exports = { getVideos, getVideoById, postVideo, patchVotes, patchViews };
