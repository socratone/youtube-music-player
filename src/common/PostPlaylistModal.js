import styles from './PostPlaylistModal.module.scss';
import postPlaylistVideo from '../helper/postPlaylistVideo';
import Modal from './Modal';

class PostPlaylistModal {
  setTitle(title) { // title: string
    this.title = title;
  }

  setDescription(description) { // description: string, 줄바꿈을 위해 <br>을 넣을 수 있다.
    this.description = description;
  }

  setPlaylist(playlistPage) {
    this.playlistPage = playlistPage;
    this.playlists = this.playlistPage.playlists;
  }

  setVideo(video) {
    this.video = video;
  }
  
  show() {
    let firstLine, secondLine, thirdLine, playlist;
    const createFirstLine = () => {
      const title = document.createElement('p');
      title.classList.add(styles.title);
      title.textContent = this.title;
  
      const xButton = document.createElement('a');
      xButton.classList.add(styles.xButton);
      xButton.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
      xButton.addEventListener('click', () => this.clear());
      
      firstLine = document.createElement('div');
      firstLine.classList.add(styles.firstLine);
      firstLine.append(title, xButton);
    };
    
    const createSecondLine = () => {
      const description = document.createElement('p');
      description.classList.add(styles.description);
      description.innerHTML = this.description;
      
      secondLine = document.createElement('div');
      secondLine.classList.add(styles.secondLine);
      secondLine.append(description);
    };

    const createPlaylist = () => {
      playlist = document.createElement('div');
      playlist.classList.add(styles.playlist);

      this.playlists.forEach(item => {
        const li = document.createElement('li');
        li.classList.add(styles.playlistItem);
        li.classList.add(item.listId);
        li.addEventListener('click', async () => {
          const listId = item.listId;
          for (let i = 0; i < item.videos.length; i++) {
            if (item.videos[i].videoId === this.video.videoId) {
              const modal = new Modal('small');
              modal.setTitle('알림');
              modal.setDescription('이미 추가된 음악입니다.');
              modal.setButtons('확인');
              modal.show();
              return this.clear();
            }
          }
          const isOk = await postPlaylistVideo(listId, this.video)
          if (isOk) {
            const lists = this.playlistPage.playlists.map(playlist => {
              if (playlist.listId === item.listId) {
                playlist.videos.push(this.video);
              }
              return playlist;
            });

            this.playlistPage.playlists = lists;
            this.playlistPage.clearPlaylist();
            this.playlistPage.appendPlaylist(this.playlistPage.playlists);
            this.playlistPage.appendAddPlaylistButton();
          }

          this.clear();
        });

        const setThumbnail = () => {
          const thumbnail = document.createElement('div');
          thumbnail.classList.add(styles.thumbnail);
          if (item.videos[0]) {
            thumbnail.style.backgroundImage = `url(https://i.ytimg.com/vi/${item.videos[0].videoId}/default.jpg)`;
          } else {
            thumbnail.style.backgroundColor = 'whitesmoke';
          }
          li.append(thumbnail);
        };

        const setTitle = () => {
          const title = document.createElement('div');
          title.classList.add(styles.title);
          title.innerHTML = item.title;
          li.append(title);
        };

        setThumbnail();
        setTitle();
        
        playlist.append(li);
      });
    };
    
    const createThirdLine = () => {
      thirdLine = document.createElement('div');
      thirdLine.classList.add(styles.thirdLine);
      
      const firstButton = document.createElement('button');
      firstButton.classList.add(styles.button);
      firstButton.addEventListener('click', () => this.clear());
      firstButton.innerHTML = '확인';

      thirdLine.append(firstButton);
    };
    
    createFirstLine();
    createSecondLine();
    createPlaylist();
    createThirdLine();
    
    this.modal = document.createElement('section');
    this.modal.classList.add(styles.modal);
    this.modal.style.height = window.innerHeight - 120 + 'px';
  
    this.modal.append(firstLine, secondLine, playlist, thirdLine);

    this.modalWrap = document.createElement('div');
    this.modalWrap.classList.add(styles.modalWrap);
    this.modalWrap.append(this.modal)
    
    this.element = document.createElement('div');
    this.element.classList.add(styles.modalBackground);
    this.element.append(this.modalWrap);

    document.body.append(this.element);

    setTimeout(() => {
      this.element.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
      this.modalWrap.style.top = '0';
      this.modal.style.transform = 'scale(1)';
    }, 0)
  }

  clear() {
    setTimeout(() => {
      this.element.remove();
    }, 100);
  }
}

export default PostPlaylistModal;