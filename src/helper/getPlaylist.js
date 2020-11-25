import { url } from '../config/config';
import Modal from '../common/Modal';

const getPlaylist = () => {
  return fetch(url + '/api/playlist_video')
    .then(response => {
      if (response.status !== 200) throw new Error(response.statusText);
      console.log('response:', response)
      return response.json()
    })
    .catch(error => {
      const modal = new Modal('medium');
      modal.setTitle('오류');
      modal.setDescription(`다음 오류가 발생했습니다.<br>${error}`);
      modal.setButtons('확인');
      modal.show();
      return [];
    });
};

export default getPlaylist;