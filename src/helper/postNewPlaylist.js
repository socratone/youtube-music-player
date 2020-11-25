import axios from 'axios';
import { url } from '../config/config';
import Modal from '../common/Modal';

const postNewPlaylist = async title => {
  if (title.length < 1) {
    const modal = new Modal('small');
    modal.setTitle('알림');
    modal.setDescription('빈 제목은 사용할 수 없습니다.');
    modal.setButtons('확인');
    modal.show();
    return null;
  }

  try {
    const body = { title };
    const response = await axios.post(`${url}/api/new-playlist`, body);
    if (response.status !== 200) throw new Error(response.statusText);
    return { listId: response.data, title, videos: [] };
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