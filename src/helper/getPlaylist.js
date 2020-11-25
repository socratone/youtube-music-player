import Modal from '../common/Modal';

const url = 'http://localhost:4000/api/'

const getPlaylist = () => {
  return fetch(url + 'playlist_video')
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