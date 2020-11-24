import styles from './SearchPage.module.scss';
import Page from './Page';
import getVideosByQuery from '../helper/getVideosByQuery';
import filterVideos from '../helper/filterVideos';
import Modal from '../common/Modal';

class SearchPage extends Page {
  constructor() {
    super();
    this.id = 'search';
    this.icon = 'fa-search'
  }

  appendSearchResultList(videos) {
    this.list = document.createElement('ul');
    this.list.classList.add(styles.searchResultListWrap);
    
    videos.forEach(video => {
      const li = document.createElement('li');

      const setThumbnail = () => {
        const thumbnail = document.createElement('div');
        thumbnail.classList.add(styles.searchResultListThumbnail);
        thumbnail.style.backgroundImage = `url(https://i.ytimg.com/vi/${video.videoId}/default.jpg)`;
        li.append(thumbnail);
      };
      
      const setTitle = () => {
        const title = document.createElement('div');
        title.classList.add(styles.searchResultListTitle);
        title.classList.add(video.videoId);
        title.innerHTML = video.title;

        title.addEventListener('click', ({ target }) => {
          const getClickedIdFromClassValue = (target, stringNotId) => {
            const classValue = target.classList.value;
            const classStrings = classValue.split(' ');
            const [ id ] = classStrings.filter(string => string !== stringNotId);
            return id;
          };

          const deleteDuplicateId = (videoId, videos) => {
            return videos.filter(video => video.videoId !== videoId);
          };

          const videoId = getClickedIdFromClassValue(target, styles.searchResultListTitle);
          const title = target.textContent;

          this.playerPage.videos = deleteDuplicateId(videoId, this.playerPage.videos);
          this.playerPage.videos.unshift({ videoId, title });

          this.playerPage.player.pauseVideo();
          this.playerPage.clearCueList();
          this.playerPage.appendCueList(this.playerPage.videos);
          this.playerPage.setTitleColor(videoId);
          this.playerPage.clearTimer();
          this.playerPage.setCurrentVideoId(videoId);
          this.playerPage.playVideoId(videoId);
          this.hide();
          this.playerPage.show();
        });

        li.append(title);
      };

      const setEllipsis = () => {
        const ellipsis = document.createElement('div');
        ellipsis.classList.add(styles.searchResultListEllipsis);
        const icon = '<i class="fa fa-ellipsis-v" aria-hidden="true"></i>';
        ellipsis.insertAdjacentHTML('beforeend', icon)
        li.append(ellipsis);
      };

      setThumbnail();
      setTitle();
      setEllipsis();

      this.list.append(li);
    });

    this.element.append(this.list);
  }

  clearSearchResultList() {
    if (this.list) this.list.remove();
    this.list = null;
  }

  appendSearchComponent() {
    const handleButtonClick = async () => {
      const query = this.input.value;
      if (query.length === 0) {
        const modal = new Modal('small');
        modal.setTitle('알림');
        modal.setDescription('값을 입력하세요.');
        modal.setButtons('확인');
        return modal.show();
      }
      
      this.clearSearchResultList();
      const data = await getVideosByQuery(query, 2);
      if (data.error) {
        return console.log(data.error.code, data.error.message);
      } 

      const videos = data.items;
      const filteredVideos = filterVideos(videos)
      console.log('filteredVideos:', filteredVideos)
      this.appendSearchResultList(filteredVideos);
      this.saveSearchResultList(filteredVideos)
    };

    this.input = document.createElement('input');
    this.input.type = 'text';
    this.input.addEventListener('keypress', ({ key }) => {
      if (key === 'Enter') handleButtonClick();
    });
   
    const button = document.createElement('a');
    button.innerHTML = '<i class="fa fa-search" aria-hidden="true"></i>';
    
    const buttonWrap = document.createElement('div');
    buttonWrap.classList.add(styles.buttonWrap);
    buttonWrap.append(button);
    buttonWrap.addEventListener('click', handleButtonClick);

    const div = document.createElement('div');
    div.classList.add(styles.searchComponent);
    div.append(this.input, buttonWrap);
    this.element.append(div);
  }

  setPlayerPageInstance(playerPage) {
    this.playerPage = playerPage;
  }

  saveSearchResultList(videos) {
    localStorage.setItem('search-result-list', JSON.stringify(videos));
  }

  loadSearchResultList() {
    const videos = localStorage.getItem('search-result-list');
    if (videos) return JSON.parse(videos);
    return false;
  }
}

export default SearchPage;