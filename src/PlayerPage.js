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
    const tag = `
      <div class="${styles.playButtons}">
        <button class="repeat"><i class="fa fa-expand" aria-hidden="true"></i></button>
        <button class="backward"><i class="fa fa-step-backward" aria-hidden="true"></i></i></button>
        <button class="play"><i class="fa fa-play" aria-hidden="true"></i></button>
        <button class="forward"><i class="fa fa-step-forward" aria-hidden="true"></i></button>
        <button class="random"><i class="fa fa-random" aria-hidden="true"></i></button>
      </div>
    `;
    this.element.insertAdjacentHTML('beforeend', tag)
  }
}

export default PlayerPage;