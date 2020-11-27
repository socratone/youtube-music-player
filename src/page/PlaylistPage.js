import styles from './PlaylistPage.module.scss';
import Page from './Page';
import Modal from '../common/Modal';
import PutPlaylistModal from '../common/PutPlaylistModal';
import postPlaylist from '../helper/postPlaylist';
import deletePlaylist from '../helper/deletePlaylist';
import putPlaylist from '../helper/putPlaylist';
import { PINK, GREY } from '../common/color';

class PlaylistPage extends Page {
  constructor() {
    super();
    this.id = 'playlist';
    this.icon = 'fa-list-ul';
  }

  appendPlaylist(playlists) {
    this.playlists = playlists;
    const getClickedIdFromClassValue = (target, stringNotId) => {
      const classValue = target.classList.value;
      const classStrings = classValue.split(' ');
      const [ id ] = classStrings.filter(string => string !== stringNotId);
      return id;
    };

    const getVideosById = id => {
      const [ clickedUserList ] = playlists.filter(userList => userList.listId.toString() === id);
      const { videos } = clickedUserList;
      return videos;
    };

    this.listWrap = document.createElement('ul');
    this.listWrap.classList.add(styles.listWrap);
    
    playlists.forEach(userList => {
      const li = document.createElement('li');
      li.classList.add(styles.list);

      const setThumbnail = () => {
        let hover;
        const setHover = () => {
          const playButton = document.createElement('a');
          playButton.classList.add(styles.playButton);
          playButton.classList.add(userList.listId);
          playButton.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
          
          if (userList.videos[0]) {
            const that = this;
            playButton.addEventListener('click', function () {
              const id = getClickedIdFromClassValue(this, styles.playButton);
              const videos = getVideosById(id);
  
              that.playerPage.player.pauseVideo();
              that.playerPage.clearCueList();
              that.playerPage.appendCueList(videos);
              that.playerPage.setTitleColor(videos[0].videoId);
              that.playerPage.clearTimer();
              that.playerPage.setCurrentVideoId(videos[0].videoId);
              that.playerPage.playVideoId(videos[0].videoId);
              that.hide();
              that.playerPage.show();
            });
          }

          const listButton = document.createElement('a');
          listButton.classList.add(styles.listButton);
          listButton.classList.add(userList.listId);
          listButton.innerHTML = '<i class="fa fa-folder-o" aria-hidden="true"></i>';
          
          listButton.addEventListener('click', function () {
            const id = getClickedIdFromClassValue(this, styles.listButton);
            const videos = getVideosById(id);
            const modal = new PutPlaylistModal();
            modal.setTitle('Playlist');
            modal.setDescription('플레이리스트를 수정하세요.');
            modal.setVideos(videos);
            modal.show();
          });

          listButton.addEventListener('mouseover', () => {
            listButton.firstElementChild.classList.remove('fa-folder-o');
            listButton.firstElementChild.classList.add('fa-folder-open-o');
          });
          
          listButton.addEventListener('mouseout', () => {
            listButton.firstElementChild.classList.remove('fa-folder-open-o');
            listButton.firstElementChild.classList.add('fa-folder-o');
          });
          
          const editButton = document.createElement('a');
          editButton.classList.add(styles.editButton);
          editButton.classList.add(userList.listId);
          editButton.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>'

          const that = this;
          editButton.addEventListener('click', function () {
            const id = getClickedIdFromClassValue(this, styles.editButton);
            const modal = new Modal('medium');
            modal.setTitle('Playlist');
            modal.setDescription('수정하고 싶은 이름을 입력하세요.');
            modal.setButtons('OK', 'Cancel');
            modal.setInput('100%');
            modal.setCallback(async () => { 
              const isOk = await putPlaylist(id, modal.input.value);
              if (isOk) {
                that.playlists = that.playlists.map(playlist => {
                  if (playlist.listId === Number(id)) {
                    playlist.title = modal.input.value;
                  }
                  return playlist;
                });
                that.clearPlaylist();
                that.appendPlaylist(that.playlists);
                that.appendAddPlaylistButton();
              }
            })
            modal.show();
          });

          const eraseButton = document.createElement('a');
          eraseButton.classList.add(styles.eraseButton);
          eraseButton.classList.add(userList.listId);
          eraseButton.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';

          eraseButton.addEventListener('click', function () {
            const modal = new Modal('small');
            modal.setTitle('Playlist');
            modal.setDescription('정말로 삭제하시겠습니까?');
            modal.setButtons('OK', 'Cancel');
            modal.setCallback(async () => { 
              const id = getClickedIdFromClassValue(this, styles.eraseButton);
              const isOk = await deletePlaylist(id);
              if (isOk) {
                that.playlists = that.playlists.filter(playlist => playlist.listId !== Number(id));
                that.clearPlaylist();
                that.appendPlaylist(that.playlists);
                that.appendAddPlaylistButton();
              }
            });
            modal.show();
          });

          // 이상은 buttons 이하는 hover
          hover = document.createElement('div');
          hover.classList.add(styles.listThumbnailHover);
          hover.append(playButton);
          hover.append(listButton);
          hover.append(eraseButton);
          hover.append(editButton);
  
          hover.addEventListener('mouseover', () => {
            hover.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            playButton.style.color = PINK;
            listButton.style.color = GREY;
            eraseButton.style.color = GREY;
            editButton.style.color = GREY;
          });
          
          hover.addEventListener('mouseout', () => {
            hover.style.backgroundColor = '';
            playButton.style.color = '';
            listButton.style.color = '';
            eraseButton.style.color = '';
            editButton.style.color = '';
          });
        }

        const thumbnail = document.createElement('div');
        thumbnail.classList.add(styles.listThumbnail);
        if (userList.videos[0]) {
          const image = `https://i.ytimg.com/vi/${userList.videos[0].videoId}/mqdefault.jpg`;
          thumbnail.style.backgroundImage = `url(${image})`;
        } else {
          thumbnail.style.backgroundColor = 'black';
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
      modal.setCallback(async () => { 
        const playlist = await postPlaylist(modal.input.value);
        if (playlist) {
          this.playlists.push(playlist);
          this.clearPlaylist();
          this.appendPlaylist(this.playlists);
          this.appendAddPlaylistButton();
        }
      })
      modal.show();
    });

    const li = document.createElement('li');
    li.append(wrap);
    
    this.listWrap.append(li);
  }

  clearPlaylist() {
    this.listWrap.remove();
  }
}

export default PlaylistPage;