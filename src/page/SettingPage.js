import styles from './SettingPage.module.scss';
import Page from './Page';
import Modal from '../common/Modal';
import getTitleByVideoId from '../helper/getTitleByVideoId';
import getVideoIdFromUrl from '../helper/getVideoIdFromUrl';
import validateVideoId from '../helper/validateVideoId';
import { PINK, GREY } from '../common/color';

class SettingPage extends Page {
  constructor() {
    super();
    this.id = 'setting';
    this.icon = 'fa-cog';
  }

  setPlayerPageInstance(playerPage) {
    this.playerPage = playerPage;
  }

  appendSettingUl() {
    const handleButtonClick = async () => {
      const url = this.searchInput.value;
      if (url.length === 0) {
        const modal = new Modal('small');
        modal.setTitle('알림');
        modal.setDescription('비디오의 주소를 입력하세요.');
        modal.setButtons('확인');
        return modal.show();
      }

      const deleteDuplicateId = (videoId, videos) => {
        return videos.filter(video => video.videoId !== videoId);
      };

      const videoId = getVideoIdFromUrl(url);
      const isValidate = validateVideoId(videoId);
      if (!isValidate) {
        const modal = new Modal('small');
        modal.setTitle('알림');
        modal.setDescription('유효한 videoId가 아닙니다.');
        modal.setButtons('확인');
        return modal.show();
      }

      const title = await getTitleByVideoId(videoId);

      const thumbnail = document.createElement('div');
      thumbnail.classList.add(styles.thumbnail);
      thumbnail.style.backgroundImage = `url("https://i.ytimg.com/vi/${videoId}/hqdefault.jpg")`;
      
      const playButton = document.createElement('a');
      playButton.classList.add(styles.playButton);
      playButton.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
      playButton.addEventListener('click', () => {
        this.playerPage.videos = deleteDuplicateId(videoId, this.playerPage.videos);
        this.playerPage.videos.unshift({ videoId, title });

        this.playerPage.player.pauseVideo();
        this.playerPage.clearCueUl();
        this.playerPage.appendCueUl(this.playerPage.videos);
        this.playerPage.setTitleColor(videoId);
        this.playerPage.clearTimer();
        this.playerPage.setCurrentVideoId(videoId);
        this.playerPage.playVideoId(videoId);
        this.hide();
        this.playerPage.show();

        this.searchInput.value = '';
        this.thumbnailWrap.remove();
        this.thumbnailTitle.remove();
      });

      const thumbnailHover = document.createElement('div');
      thumbnailHover.classList.add(styles.thumbnailHover);
      thumbnailHover.append(playButton);

      thumbnailHover.addEventListener('mouseover', () => {
        thumbnailHover.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        playButton.style.color = PINK;
      });
      
      thumbnailHover.addEventListener('mouseout', () => {
        thumbnailHover.style.backgroundColor = '';
        playButton.style.color = '';
      });

      if (this.thumbnailWrap) this.thumbnailWrap.remove();
      if (this.thumbnailTitle) this.thumbnailTitle.remove();
      
      this.thumbnailWrap = document.createElement('div');
      this.thumbnailWrap.classList.add(styles.thumbnailWrap);
      this.thumbnailWrap.append(thumbnail, thumbnailHover);

      this.thumbnailTitle = document.createElement('p');
      this.thumbnailTitle.classList.add(styles.thumbnailTitle);
      this.thumbnailTitle.innerHTML = title; 

      this.videoList.append(this.thumbnailWrap, this.thumbnailTitle);
    };

    const searchInfo = `
      <div class="${styles.searchInfo}">
        <p>유튜브에서 비디오를 찾은 뒤 비디오의 링크를 입력하세요.</p> 
        <p>이렇게도 음악을 추가할 수 있어요.</p>
      </div>`;

    this.searchInput = document.createElement('input');
    this.searchInput.type = 'text';
    this.searchInput.addEventListener('keypress', ({ key }) => {
      if (key === 'Enter') handleButtonClick();
    });
   
    const button = document.createElement('a');
    button.innerHTML = '<i class="fa fa-search" aria-hidden="true"></i>';
    
    const buttonWrap = document.createElement('div');
    buttonWrap.classList.add(styles.buttonWrap);
    buttonWrap.append(button);
    buttonWrap.addEventListener('click', handleButtonClick);

    const searchComponent = document.createElement('div');
    searchComponent.classList.add(styles.searchComponent);
    searchComponent.append(this.searchInput, buttonWrap);
    
    this.videoList = document.createElement('li');
    this.videoList.classList.add(styles.settingList);
    this.videoList.append(searchComponent);
    this.videoList.insertAdjacentHTML('beforeend', searchInfo);

    const ul = document.createElement('ul');
    ul.classList.add(styles.settingUl);
    ul.append(this.videoList);

    this.element.append(ul)
  }
}

export default SettingPage;