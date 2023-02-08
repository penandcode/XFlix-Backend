const { String } = require("core-js");
const mongoose = require("mongoose");

const votesSchema = new mongoose.Schema(
  {
    upVotes: { type: Number, default: 0 },
    downVotes: { type: Number, default: 0 },
  },
  { _id: false }
);

const videoSchema = new mongoose.Schema({
  videoLink: {
    type: String,
    required: true,
    unique: true,
    trmin: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: String,
    trim: true,
    default: "All",
  },
  contentRating: {
    type: String,
    trim: true,
    default: "Anyone",
  },
  releaseDate: {
    type: Date,
    trim: true,
    required: true,
  },
  previewImage: {
    type: "String",
    trim: true,
    required: true,
  },
  votes: {
    type: votesSchema,
    default: {
      upVotes: 0,
      downVotes: 0,
    },
  },
  viewCount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("video", videoSchema);
