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
    const playButtons = document.createElement('div');
    playButtons.classList.add(styles.playButtons);

    this.repeat = document.createElement('button');
    this.repeat.insertAdjacentHTML('beforeend', '<i class="fa fa-expand" aria-hidden="true"></i>');
    this.backward = document.createElement('button');
    this.backward.insertAdjacentHTML('beforeend', '<i class="fa fa-step-backward" aria-hidden="true"></i>');
    this.play = document.createElement('button');
    this.play.insertAdjacentHTML('beforeend', '<i class="fa fa-play" aria-hidden="true"></i>');
    this.forward = document.createElement('button');
    this.forward.insertAdjacentHTML('beforeend', '<i class="fa fa-step-forward" aria-hidden="true"></i>');
    this.random = document.createElement('button');
    this.random.insertAdjacentHTML('beforeend', '<i class="fa fa-random" aria-hidden="true"></i>');

    playButtons.append(this.repeat, this.backward, this.play, this.forward, this.random);
    this.element.append(playButtons);
  }
}

export default PlayerPage;