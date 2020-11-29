import key from '../key/youtubeKey';
import Modal from '../common/Modal';

const getTitleByVideoId = videoId => {
  let url = 'https://www.googleapis.com/youtube/v3/videos';
  url += '?part=snippet';
  url += `&key=${key}`;
  url += `&id=${videoId}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => data.items[0].snippet.title)
    .catch(error => {
      const modal = new Modal('medium');
      modal.setTitle('오류');
      modal.setDescription(`다음 오류가 발생했습니다.<br>${error}`);
      modal.setButtons('확인');
      modal.show();
      return '';
    });
};

export default getTitleByVideoId;