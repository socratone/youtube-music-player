import key from '../key/youtubeKey';

const getVideosByQuery = (query, count = 10) => {
  let url = 'https://www.googleapis.com/youtube/v3/search';
  url += '?part=snippet';
  url += `&key=${key}`;
  url += `&q=${query}`;
  url += `&maxResults=${count}`;
  url += '&type=video';
  url += '&videoSyndicated=true'; // youtube.com 외부에서 재생할 수 있는 동영상
  url += '&videoCategoryId=10'; // music

  return fetch(url)
    .then(response => response.json())
    .catch(error => error);
};

export default getVideosByQuery;

