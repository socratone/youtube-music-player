import { url } from '../config/config';
import Modal from '../common/Modal';

const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

const postNewPlaylist = async title => {
  title.toString();
  if (title.length < 1) {
    const modal = new Modal('small');
    modal.setTitle('알림');
    modal.setDescription('빈 제목은 사용할 수 없습니다.');
    modal.setButtons('확인');
    modal.show();
    return null;
  }

  try {
    const body = JSON.stringify({ title });
    const response = await fetch(url + '/api/new-playlist', {
      method: 'POST',
      headers: myHeaders,
      body,
      redirect: 'follow',
    });
    if (response.status !== 200) throw new Error(response.statusText);
    const listId = await response.json();
    const list = { listId, title, videos: [] };
    return list;
  } catch (error) {
    const modal = new Modal('medium');
    modal.setTitle('오류');
    modal.setDescription(`다음 오류가 발생했습니다.<br>${error}`);
    modal.setButtons('확인');
    modal.show();
    return null;
  }
};

export default postNewPlaylist;