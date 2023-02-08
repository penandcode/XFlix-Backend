const Joi = require("joi");

const getVideos = {
  query: Joi.object().keys({
    title: Joi.string(),
    genres: Joi.string(),
    contentRating: Joi.string().valid("Anyone", "7+", "12+", "16+", "18+"),
    sortBy: Joi.string().valid("viewCount", "releaseDate"),
  }),
};

const getVideoById = {
  params: Joi.object().keys({
    videoId: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!value.match(/^[0-9a-fA-F]{24}$/)) {
          return helpers.message('"{{#label}}" must be a valid mongo id');
        }
        return value;
      }),
  }),
};

const postVideo = {
  body: Joi.object().keys({
    videoLink: Joi.string()
      .required()
      .custom((value, helpers) => {
        return value;
      }),
    title: Joi.string().required(),
    genre: Joi.string()
      .valid("Education", "Sports", "Movies", "Comedy", "Lifestyle", "All")
      .required(),
    contentRating: Joi.string()
      .valid("Anyone", "7+", "12+", "16+", "18+")
      .required(),
    releaseDate: Joi.date().required(),
    previewImage: Joi.string().required(),
  }),
};

const patchVotes = {
  body: Joi.object().keys({
    vote: Joi.string().valid("upVote", "downVote").required(),
    change: Joi.string().valid("increase", "decrease").required(),
  }),
  params: Joi.object().keys({
    videoId: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!value.match(/^[0-9a-fA-F]{24}$/)) {
          return helpers.message('"{{#label}}" must be a valid mongo id');
        }
        return value;
      })
  }),
};

// const patchVotes = {
//   body: Joi.object().keys({
//       vote: Joi.string().valid("upVote", "downVote").required(),
//       change: Joi.string().valid("increase", "decrease").required(),
//   }),
//   params: Joi.object().keys({
//       videoId: Joi.string().required().custom((value, helpers) => {
//           if (!value.match(/^[0-9a-fA-F]{24}$/)) {
//               return helpers.message('"{{#label}}" must be a valid mongo id');
//           }
//           return value;
//       })
//   })
// };

const patchViews = {
  params: Joi.object().keys({
    videoId: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!value.match(/^[0-9a-fA-F]{24}$/)) {
          return helpers.message('"{{#label}}" must be a valid mongo id');
        }
        return value;
      }),
  }),
};

module.exports = { getVideos, getVideoById, postVideo, patchVotes, patchViews };
