import styles from './PlayerPage.module.scss';
import Page from './Page';
import { PINK } from '../common/color';
import Dropdown from '../common/Dropdown';
import PostPlaylistModal from '../common/PostPlaylistModal';

class PlayerPage extends Page {
  constructor() {
    super();
    this.id = 'player';
    this.icon = 'fa-youtube-play'
    this.isShuffle = false;
    this.isSetProgressBar = false;
  }

  getCurrentVideoIndex() {
    let index;
    this.videos.forEach((video, i) => {
      if (video.videoId === this.currentVideoId) index = i;
    });
    return index;
  }

  appendYoutubeVideo() {
    const tag = `
      <div class="${styles.videoWrap}">
        <div class="${styles.video}" id="youtube-video"></div>
      </div>
    `;
    this.element.insertAdjacentHTML('afterbegin', tag);
  }

  setCurrentVideoId(videoId) {
    this.currentVideoId = videoId;
  }

  setPlayer(player) {
    this.player = player;
  }

  playPreviousVideo() {
    this.progressBar.value = 0;
    this.clearTimer();

    const index = this.getCurrentVideoIndex();
    let video = this.videos[index - 1];
    if (!video) video = this.videos[this.videos.length - 1];
      
    this.setTitleColor(video.videoId);
    this.playVideoId(video.videoId);
    this.setCurrentVideoId(video.videoId);

    this.play.style.display = 'none';
    this.pause.style.display = 'block';
  }

  playNextVideo() {
    this.progressBar.value = 0;
    this.clearTimer();

    const index = this.getCurrentVideoIndex();
    let video = this.videos[index + 1];
    if (!video) video = this.videos[0];

    this.setTitleColor(video.videoId);
    this.playVideoId(video.videoId);
    this.setCurrentVideoId(video.videoId);

    this.play.style.display = 'none';
    this.pause.style.display = 'block';
  }

  appendProgressBar() {
    this.progressBar = document.createElement('input');
    this.progressBar.type = 'range';
    this.progressBar.classList.add(styles.progressBar);
    this.progressBar.step = 1;
    this.element.append(this.progressBar);
  }

  setProgressBar() {
    this.isSetProgressBar = true;

    const duration = this.player.getDuration().toFixed();
    this.progressBar.max = duration;
    this.progressBar.value = 0;

    this.progressBar.addEventListener('mousedown', () => {
      this.clearTimer();
    });
    
    this.progressBar.addEventListener('click', () => {
      this.player.seekTo(this.progressBar.value);
    });
  } 

  setTimer(second = 0) {
    this.timer = setInterval(() => {
      this.progressBar.value = second;
      second++;
    }, 1000);
  }

  clearTimer() {
    clearInterval(this.timer);
    this.timer = null;
  }

  revealPlayButton() {
    this.pause.style.display = 'none';
    this.play.style.display = 'block';
  }

  revealPauseButton() {
    this.play.style.display = 'none';
    this.pause.style.display = 'block';
  }

  appendPlayButtons() {
    const setButtonWrap = () => {
      this.playButtons = document.createElement('div');
      this.playButtons.classList.add(styles.playButtons);
    };

    const setBackwardButton = () => {
      this.backward = document.createElement('button');
      this.backward.insertAdjacentHTML('beforeend', '<i class="fa fa-step-backward" aria-hidden="true"></i>');

      this.backward.addEventListener('click', () => {
        this.playPreviousVideo();  
      });

      this.playButtons.append(this.backward);
    };

    const setPlayButton = () => {
      this.play = document.createElement('button');
      this.play.insertAdjacentHTML('beforeend', '<i class="fa fa-play" aria-hidden="true"></i>');
      this.play.addEventListener('click', () => {
        this.player.playVideo();
        this.revealPauseButton();
      });
      this.playButtons.append(this.play);
    };

    const setPauseButton = () => {
      this.pause = document.createElement('button');
      this.pause.insertAdjacentHTML('beforeend', '<i class="fa fa-pause" aria-hidden="true"></i>');
      this.pause.addEventListener('click', () => {
        this.player.pauseVideo();
        this.clearTimer();
        this.revealPlayButton();
      });
      this.pause.style.display = 'none';
      this.playButtons.append(this.pause);
    };
    
    const setForwardButton = () => {
      this.forward = document.createElement('button');
      this.forward.insertAdjacentHTML('beforeend', '<i class="fa fa-step-forward" aria-hidden="true"></i>');

      this.forward.addEventListener('click', () => {
        this.playNextVideo();
      });

      this.playButtons.append(this.forward);
    };

    const setShuffleButton = () => {
      this.shuffle = document.createElement('button');
      this.shuffle.insertAdjacentHTML('beforeend', '<i class="fa fa-random" aria-hidden="true"></i>');
      this.shuffle.addEventListener('click', () => {
        const shuffleArray = (array) => {
          for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
        };

        const setShuffleVideos = () => {
          if (!this.originalVideos) this.originalVideos = [...this.videos];
          shuffleArray(this.videos);
        };

        const setOriginalVideos = () => {
          this.videos = [...this.originalVideos];
        };

        if (this.isShuffle) {
          console.log('셔플 off')
          this.isShuffle = false;
          this.shuffle.style.color = '';
          setOriginalVideos();
        } else {
          console.log('셔플 on')
          this.isShuffle = true;
          this.shuffle.style.color = PINK;
          setShuffleVideos();
        }
      });
      this.playButtons.append(this.shuffle);
    };

    setButtonWrap();
    setBackwardButton();
    setPlayButton();
    setPauseButton();
    setForwardButton();
    setShuffleButton();

    this.element.append(this.playButtons);    
  }
  
  appendCueUl(videos) {
    localStorage.setItem('last-cuelist', JSON.stringify(videos));
    this.videos = videos;

    this.cueUl = document.createElement('ul');
    this.cueUl.classList.add(styles.cueUl);

    videos.forEach(video => {
      const li = document.createElement('li');
      li.classList.add(styles.cueList)

      const setThumbnail = () => {
        const thumbnail = document.createElement('div');
        thumbnail.classList.add(styles.cueListThumbnail);
        thumbnail.style.backgroundImage = `url(https://i.ytimg.com/vi/${video.videoId}/default.jpg)`;
        li.append(thumbnail);
      };
      
      const setCueListTitle = () => {
        const cueListTitle = document.createElement('div');
        cueListTitle.classList.add(styles.cueListTitle);
        cueListTitle.classList.add(video.videoId);
        cueListTitle.innerHTML = video.title;

        cueListTitle.addEventListener('click', () => {
          this.clearTimer();
          this.progressBar.value = 0;
          this.setCurrentVideoId(video.videoId);
          this.setTitleColor(video.videoId);
          this.playVideoId(video.videoId);
          this.revealPauseButton();
        });

        li.append(cueListTitle);
      };

      const setCueListEllipsis = () => {
        const cueListEllipsis = document.createElement('div');
        cueListEllipsis.classList.add(styles.cueListEllipsis);
        const icon = '<i class="fa fa-ellipsis-v" aria-hidden="true"></i>';
        const that = this;
        cueListEllipsis.addEventListener('click', function () {
          const resetEvents = () => {
            that.dropdown = null;
            window.onclick = null;
          }

          if (that.dropdown) {
            that.dropdown.clear();
            return resetEvents();
          }

          that.dropdown = new Dropdown();
          that.dropdown.setTarget(this);
          that.dropdown.setTitles(['플레이리스트에 담기', '현재 재생목록에서 삭제']);
          that.dropdown.setCallbacks([() => {
            const modal = new PostPlaylistModal();
            modal.setTitle('Playlist');
            modal.setDescription('음악을 담을 플레이리스트를 선택하세요.');
            modal.setPlaylist(that.playlistPage);
            modal.setVideo(video);
            modal.show();
            resetEvents();
          }, () => {
            const videos = that.videos.filter(item => {
              return item.videoId !== video.videoId;
            });
            that.clearCueUl();
            that.appendCueUl(videos);
            that.setTitleColor(that.currentVideoId);
            resetEvents();
          }]);
          that.dropdown.setDirection('left')
          that.dropdown.setGap(6)
          that.dropdown.setOffset(0)
          that.dropdown.show();

          window.onclick = ({ target }) => {
            // 자기 자신을 클릭했을 때는 작동하지 않는다.
            if (target.classList.contains(styles.cueListEllipsis)) return;
            if (target.parentElement?.classList.contains(styles.cueListEllipsis)) return;
            that.dropdown.clear();
            resetEvents();
          }
        });
        cueListEllipsis.insertAdjacentHTML('beforeend', icon)
        li.append(cueListEllipsis);
      };

      setThumbnail();
      setCueListTitle();
      setCueListEllipsis();

      this.cueUl.append(li);
    });

    this.element.append(this.cueUl);
  }

  setTitleColor(videoId) {
    const cueListTitles = document.querySelectorAll('.' + styles.cueListTitle);
    [...cueListTitles].forEach(cueListTitle => {
      if (cueListTitle.classList.contains(videoId)) {
        cueListTitle.style.color = PINK;
        cueListTitle.style.fontWeight = '800';
      } else {
        cueListTitle.style.color = '';
        cueListTitle.style.fontWeight = '';
      }
    });
  }

  clearCueUl() {
    this.cueUl.remove();
  }

  playVideoId(videoId) {
    this.isSetProgressBar = false;
    this.player.loadVideoById(videoId);
  }

  setPlaylistPageInstance(playlistPage) {
    this.playlistPage = playlistPage;
  }
}

export default PlayerPage;