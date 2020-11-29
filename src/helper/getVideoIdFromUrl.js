const getVideoIdFromUrl = (url) => {
  console.log('url:', url)
  const videoId = url.slice(-11);
  return videoId;
};

export default getVideoIdFromUrl;