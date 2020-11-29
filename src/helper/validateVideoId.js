const validateVideoId = videoId => {
  if (videoId.length !== 11) return false;
  return true;
};

export default validateVideoId;