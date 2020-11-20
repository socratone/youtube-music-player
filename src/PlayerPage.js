import styles from './PlayerPage.module.scss';
import Page from './Page';

class PlayerPage extends Page {
  constructor() {
    super();
    this.id = 'player';
    this.title = '플레이어';
    this.icon = 'fa-youtube-play'
  }

  appendYoutubeVideo() {
    const tag = `
      <div class="${styles.videoWrap}">
        <div class="${styles.video}" id="youtube-video"></div>
      </div>
    `;
    this.element.insertAdjacentHTML('afterbegin', tag);
  }

  setPlayer(player) {
    this.player = player;
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
        console.log('backward 버튼 클릭')
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
        console.log('forward 버튼 클릭')
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
}

export default PlayerPage;