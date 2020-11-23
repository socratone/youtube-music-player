import styles from './PlayerPage.module.scss';
import Page from './Page';
import { PINK } from '../common/color';

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
    this.isSetProgressBar = false;
    this.player.loadVideoById(video.videoId); // isSetProgressBar 설정이 바로 앞에 나와야 한다.
    this.currentVideoId = video.videoId;

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
    this.isSetProgressBar = false;
    this.player.loadVideoById(video.videoId); // isSetProgressBar 설정이 바로 앞에 나와야 한다.
    this.currentVideoId = video.videoId;

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

  appendCueList(videos) {
    this.videos = videos;

    this.cueList = document.createElement('ul');
    this.cueList.classList.add(styles.cueList);

    videos.forEach(video => {
      const li = document.createElement('li');

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
          this.isSetProgressBar = false;
          this.player.loadVideoById(video.videoId); // isSetProgressBar 설정이 바로 앞에 나와야 한다.
          this.revealPauseButton();
        });

        li.append(cueListTitle);
      };

      const setCueListEllipsis = () => {
        const cueListEllipsis = document.createElement('div');
        cueListEllipsis.classList.add(styles.cueListEllipsis);
        const icon = '<i class="fa fa-ellipsis-v" aria-hidden="true"></i>';
        cueListEllipsis.insertAdjacentHTML('beforeend', icon)
        li.append(cueListEllipsis);
      };

      setThumbnail();
      setCueListTitle();
      setCueListEllipsis();

      this.cueList.append(li);
    });

    this.element.append(this.cueList);
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

  clearCueList() {
    this.cueList.remove();
  }
}

export default PlayerPage;