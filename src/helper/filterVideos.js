const filterVideos = videos => {
  return [...videos].map(video => {
    return {
      videoId: video.id.videoId,
      title: video.snippet.title,
    };
  });
};

export default filterVideos;