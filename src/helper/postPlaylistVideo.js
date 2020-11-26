import axios from 'axios';
import { url } from '../config/config';
import Modal from '../common/Modal';

const postPlaylistVideo = async (id, video) => { 
  try {
    const response = await axios.post(`${url}/playlist/${id}`, video);
    if (response.status !== 200) throw new Error(response.statusText);
    return response.data;
  } catch (error) {
    const modal = new Modal('medium');
    modal.setTitle('오류');
    modal.setDescription(`다음 오류가 발생했습니다.<br>${error}`);
    modal.setButtons('확인');
    modal.show();
    return null;
  }
};

export default postPlaylistVideo;