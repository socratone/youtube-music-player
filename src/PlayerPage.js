import styles from './PlayerPage.module.scss';
import Page from './Page';

class PlayerPage extends Page {
  constructor() {
    super();
    this.id = 'player';
    this.icon = 'fa-youtube-play'
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

  setPreviousVideo() {

  }

  setNextVideo() {
    const index = this.getCurrentVideoIndex();
    let video = this.videos[index + 1];
    if (!video) video = this.videos[0];
      
    this.player.loadVideoById(video.videoId);
    this.currentVideoId = video.videoId;

    this.play.style.display = 'none';
    this.pause.style.display = 'block';
  }

  appendPlayButtons() {
    const setButtonWrap = () => {
      this.playButtons = document.createElement('div');
      this.playButtons.classList.add(styles.playButtons);
    };

    const setRepeatButton = () => {
      this.repeat = document.createElement('button');
      this.repeat.insertAdjacentHTML('beforeend', '<i class="fa fa-expand" aria-hidden="true"></i>');
      this.repeat.addEventListener('click', () => {
        console.log('repeat 버튼 클릭')
      });
      this.playButtons.append(this.repeat);
    };

    const setBackwardButton = () => {
      this.backward = document.createElement('button');
      this.backward.insertAdjacentHTML('beforeend', '<i class="fa fa-step-backward" aria-hidden="true"></i>');

      this.backward.addEventListener('click', () => {
        const index = this.getCurrentVideoIndex();
        let video = this.videos[index - 1];
        if (!video) video = this.videos[this.videos.length - 1];
          
        this.player.loadVideoById(video.videoId);
        this.currentVideoId = video.videoId;

        this.play.style.display = 'none';
        this.pause.style.display = 'block';  
      });

      this.playButtons.append(this.backward);
    };

    const setPlayButton = () => {
      this.play = document.createElement('button');
      this.play.insertAdjacentHTML('beforeend', '<i class="fa fa-play" aria-hidden="true"></i>');
      this.play.addEventListener('click', () => {
        this.player.playVideo();
        this.play.style.display = 'none';
        this.pause.style.display = 'block';
      });
      this.playButtons.append(this.play);
    };

    const setPauseButton = () => {
      this.pause = document.createElement('button');
      this.pause.insertAdjacentHTML('beforeend', '<i class="fa fa-pause" aria-hidden="true"></i>');
      this.pause.addEventListener('click', () => {
        this.player.pauseVideo();
        this.pause.style.display = 'none';
        this.play.style.display = 'block';
      });
      this.pause.style.display = 'none';
      this.playButtons.append(this.pause);
    };
    
    const setForwardButton = () => {
      this.forward = document.createElement('button');
      this.forward.insertAdjacentHTML('beforeend', '<i class="fa fa-step-forward" aria-hidden="true"></i>');

      this.forward.addEventListener('click', () => {
        this.setNextVideo();
      });

      this.playButtons.append(this.forward);
    };

    const setRandomButton = () => {
      this.random = document.createElement('button');
      this.random.insertAdjacentHTML('beforeend', '<i class="fa fa-random" aria-hidden="true"></i>');
      this.random.addEventListener('click', () => {
        console.log('random 버튼 클릭')
      });
      this.playButtons.append(this.random);
    };

    setButtonWrap();
    setRepeatButton();
    setBackwardButton();
    setPlayButton();
    setPauseButton();
    setForwardButton();
    setRandomButton();

    this.element.append(this.playButtons);    
  }

  appendCueList(videos) {
    this.videos = videos;

    const ul = document.createElement('ul');
    ul.classList.add(styles.cueList);

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
        cueListTitle.innerHTML = video.title;

        cueListTitle.addEventListener('click', () => {
          this.setCurrentVideoId(video.videoId);
          this.player.loadVideoById(video.videoId);
          this.play.style.display = 'none';
          this.pause.style.display = 'block';
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

      ul.append(li);
    });

    this.element.append(ul);
  }
}

export default PlayerPage;