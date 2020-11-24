import styles from './PlaylistPage.module.scss';
import Page from './Page';
import Modal from '../common/Modal';
import { PINK, GREY } from '../common/color';

class PlaylistPage extends Page {
  constructor() {
    super();
    this.id = 'playlist';
    this.icon = 'fa-list-ul';
  }

  appendPlaylist(userLists) {
    const getClickedIdFromClassValue = (target, stringNotId) => {
      const classValue = target.parentElement.classList.value;
      const classStrings = classValue.split(' ');
      const [ id ] = classStrings.filter(string => string !== stringNotId);
      return id;
    };

    const getVideosById = id => {
      const [ clickedUserList ] = userLists.filter(userList => userList.listId.toString() === id);
      const { videos } = clickedUserList;
      return videos;
    };

    this.listWrap = document.createElement('ul');
    this.listWrap.classList.add(styles.listWrap);
    
    userLists.forEach(userList => {
      const li = document.createElement('li');
      li.classList.add(styles.list);

      const setThumbnail = () => {
        const thumbnail = document.createElement('div');
        thumbnail.classList.add(styles.listThumbnail);
        thumbnail.style.backgroundImage = `url(https://i.ytimg.com/vi/${userList.videos[0].videoId}/mqdefault.jpg)`;
        
        let hover;
        const setHover = () => {
          const playButton = document.createElement('a');
          playButton.classList.add(styles.playButton);
          playButton.classList.add(userList.listId);
          playButton.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';

          playButton.addEventListener('click', ({ target }) => {
            const id = getClickedIdFromClassValue(target, styles.playButton);
            const videos = getVideosById(id);

            this.playerPage.player.pauseVideo();
            this.playerPage.clearCueList();
            this.playerPage.appendCueList(videos);
            this.playerPage.setTitleColor(videos[0].videoId);
            this.playerPage.clearTimer();
            this.playerPage.playVideoId(videos[0].videoId);
            this.hide();
            this.playerPage.show();
          });

          const editButton = document.createElement('a');
          editButton.classList.add(styles.editButton);
          editButton.classList.add(userList.listId);
          editButton.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>'

          editButton.addEventListener('click', ({ target }) => {
            const id = getClickedIdFromClassValue(target, styles.editButton);
            // TODO: api 요청
            console.log('다음 listId를 수정 요청합니다:', id);
          });

          const eraseButton = document.createElement('a');
          eraseButton.classList.add(styles.eraseButton);
          eraseButton.classList.add(userList.listId);
          eraseButton.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';

          eraseButton.addEventListener('click', ({ target }) => {
            const id = getClickedIdFromClassValue(target, styles.eraseButton);
            // TODO: api 요청
            console.log('다음 listId를 삭제 요청합니다:', id);
          });

          // 이상은 buttons 이하는 hover
          hover = document.createElement('div');
          hover.classList.add(styles.listThumbnailHover);
          hover.append(playButton);
          hover.append(editButton);
          hover.append(eraseButton);
  
          hover.addEventListener('mouseover', () => {
            hover.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            playButton.style.color = PINK;
            editButton.style.color = GREY;
            eraseButton.style.color = GREY;
          });
          
          hover.addEventListener('mouseout', () => {
            hover.style.backgroundColor = '';
            playButton.style.color = '';
            editButton.style.color = '';
            eraseButton.style.color = '';
          });
        }
        setHover();

        const wrap = document.createElement('div');
        wrap.classList.add(styles.listThumbnailWrap);
        wrap.append(thumbnail);
        wrap.append(hover);

        li.append(wrap);
      };

      const setTitle = () => {
        const title = document.createElement('div');
        title.classList.add(styles.listTitle);
        title.innerHTML = userList.title;

        title.addEventListener('click', () => {
          console.log('list를 클릭했습니다.')
        });

        li.append(title);
      };

      setThumbnail();
      setTitle();

      this.listWrap.append(li);
    });

    this.element.append(this.listWrap);
  }

  setPlayerPageInstance(playerPage) {
    this.playerPage = playerPage;
  }

  appendAddPlaylistButton() {
    const icon = '<i class="fa fa-plus-circle" aria-hidden="true"></i>';
    
    const button = document.createElement('a');
    button.classList.add(styles.addPlaylistButton);
    button.insertAdjacentHTML('beforeend', icon);
    
    const wrap = document.createElement('div');
    wrap.classList.add(styles.addPlaylistButtonWrap);
    wrap.append(button);

    wrap.addEventListener('click', () => {
      const modal = new Modal('medium');
      modal.setTitle('Playlist');
      modal.setDescription('새로 생성할 재생 리스트의 이름을 입력하세요.');
      modal.setButtons('OK', 'Cancel');
      modal.setInput('100%');
      modal.setCallback(() => { 
        // TODO: 재생 리스트 생성
        console.log('다음 이름으로 재생 리스트를 생성합니다:', modal.input.value)
      })
      modal.show();
    });

    const li = document.createElement('li');
    li.append(wrap);
    
    this.listWrap.append(li);
  }
}

export default PlaylistPage;