import key from '../key/youtubeKey';

const getVideosByQuery = (query, count = 10) => {
  const url = 'https://www.googleapis.com/youtube/v3/search';
  return fetch(`${url}?part=snippet&key=${key}&q=${query}&maxResults=${count}`)
    .then(response => response.json())
    .catch(error => error);
};

export default getVideosByQuery;

