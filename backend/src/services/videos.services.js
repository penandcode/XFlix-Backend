const Video = require("../models/video.model");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

// const getVideos = async (query) => {
//   let videos = await Video.find({});
//   const queryArray = Object.keys(query);
//   if (queryArray.length === 0) return videos;
//   if (query.hasOwnProperty("genres")) {
//     const genresArray = query.genres.split(",");
//     if (genresArray.includes("All")) {
//     } else {
//       let filterByGenres = [];
//       genresArray.forEach((genre) => {
//         filterByGenres = [
//           ...filterByGenres,
//           ...videos.filter((video) => video.genre == genre),
//         ];
//       });
//       videos = filterByGenres;
//     }
//   }

//   if (query.hasOwnProperty("title")) {
//     videos = videos.filter((video) =>
//       video.title.match(new RegExp(query.title, "gi"))
//     );
//   }

//   if (query.hasOwnProperty("contentRating")) {
//     const contentRatingArray = query.contentRating.split(",");
//     const filterByContentRating = [];
//     contentRatingArray.forEach((contentRating) => {
//       filterByContentRating = [
//         ...filterByContentRating,
//         ...videos.filter((video) => video.contentRating == contentRating),
//       ];
//     });
//     videos = [...filterByContentRating];
//   }
//   return videos;
// };

const getVideos = async (queryObject) => {
  let videoCollection = await Video.find({});
  const queryKeyArray = Object.keys(queryObject);
  if (queryKeyArray.length == 0) return videoCollection;
  if (queryObject.hasOwnProperty("genres")) {
    const genresArray = queryObject.genres.split(",");
    if (genresArray.includes("All")) {
    } else {
      let filteredByGenres = [];
      genresArray.forEach((genre) => {
        filteredByGenres = [
          ...filteredByGenres,
          ...videoCollection.filter((video) => video.genre == genre),
        ];
      });
      videoCollection = [...filteredByGenres];
    }
  }
  if (queryObject.hasOwnProperty("title")) {
    videoCollection = videoCollection.filter((video) =>
      video.title.match(new RegExp(queryObject.title, "gi"))
    );
  }
  if (queryObject.hasOwnProperty("contentRating")) {
    const contentRatingArray = queryObject.contentRating.split(",");
    let filteredByContentRating = [];
    contentRatingArray.forEach((contentRating) => {
      filteredByContentRating = [
        ...filteredByContentRating,
        ...videoCollection.filter(
          (video) => video.contentRating == contentRating
        ),
      ];
    });
    videoCollection = [...filteredByContentRating];
  }
  if (queryObject.hasOwnProperty("sortBy")) {
    if (queryObject.sortBy == "viewCount") {
      videoCollection.sort((a, b) => b.viewCount - a.viewCount);
    } else if (queryObject.sortBy == "releaseDate") {
      videoCollection.sort((a, b) => b.releaseDate - a.releaseDate);
    }
  }
  return videoCollection;
};

const getVideoById = async (videoId) => {
  const video = Video.findById(videoId);
  console.log(video);
  if (!video) {
    throw new ApiError(httpStatus.NOT_FOUND, "No video exists");
  }
  return video;
};

const postVideo = async (body) => {
  try {
    const video = await Video.create(body);
    return video;
  } catch (error) {
    if (error.code == 11000)
      throw new ApiError(httpStatus.CONFLICT, "Enter a unique video URL");
    else
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Internal server error"
      );
  }
};

// const patchVotes = async (id, vote, change) => {
//   // const video = await Video.findById(videoId);
//   // if (!video) throw new ApiError(httpStatus.NOT_FOUND, "No video exists with this id");
//   // if (change == "increase") {
//   //   video.votes[vote + "s"] = video.votes[vote + "s"] + 1;
//   // } else if (change == "decrease") {
//   //   if (video.votes[vote + "s"] == 0) throw new ApiError(httpStatus.BAD_REQUEST, "Upvotes or Downvotes cannot be less than 0" );
//   //   video.votes[vote + "s"] = video.votes[vote + "s"] - 1;
//   // }
//   // await video.save();
//   const video = await Video.findById(id);
//   if (!video) throw new ApiError(httpStatus.NOT_FOUND, "No such video exists");
//   if (change == "increase") {
//     // video.votes[vote + 's'] = (parseInt(video.votes[vote + 's'], 10) + 1).toString(10);
//     video.votes[vote + "s"] = video.votes[vote + "s"] + 1;
//   } else if (change == "decrease") {
//     if (video.votes[vote + "s"] == 0)
//       throw new ApiError(
//         httpStatus.BAD_REQUEST,
//         "Upvotes or Downvotes cannot be less than 0"
//       );
//     // video.votes[vote + 's'] = (parseInt(video.votes[vote + 's'], 10) - 1).toString(10);
//     video.votes[vote + "s"] = video.votes[vote + "s"] - 1;
//   }
//   await video.save();
// };

const patchVotes = async (id, vote, change) => {
  const video = await Video.findById(id);
  if (!video) throw new ApiError(httpStatus.NOT_FOUND, "No such video exists");
  console.log(vote)
  if (change == "increase") {
    video.votes[vote + "s"] = video.votes[vote + "s"] + 1;
  } else if (change == "decrease") {
    if (video.votes[vote + "s"] == 0)
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Upvotes or Downvotes cannot be less than 0"
      );
    video.votes[vote + "s"] = video.votes[vote + "s"] - 1;
  }
  await video.save();
};

const patchViews = async (videoId) => {
  const video = await Video.findById(videoId);
  if (!video)
    throw new ApiError(httpStatus.NOT_FOUND, "No video exists with this id");
  video.viewCount = video.viewCount + 1;
  await video.save();
};

module.exports = { getVideos, getVideoById, postVideo, patchVotes, patchViews };
