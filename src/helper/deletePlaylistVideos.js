import axios from 'axios';
import { url } from '../config/config';
import Modal from '../common/Modal';

const deletePlaylistVideos = async (listId, videoIds) => {
  const body = { 
    data: { videoIds } 
  };
  
  try {
    const response = await axios.delete(`${url}/playlist/${listId}/videos`, body);
    if (response.status !== 200) throw new Error(response.statusText);
    const { playlist_video } = response.data;
    if (playlist_video === 0) {
      const modal = new Modal('medium');
      modal.setTitle('오류');
      modal.setDescription('재생리스트의 음악을 삭제하지 못했습니다.');
      modal.setButtons('확인');
      modal.show();
      return null;
    }
    return true;
  } catch (error) {
    const modal = new Modal('medium');
    modal.setTitle('오류');
    modal.setDescription(`다음 오류가 발생했습니다.<br>${error}`);
    modal.setButtons('확인');
    modal.show();
    return null;
  }
};

export default deletePlaylistVideos;