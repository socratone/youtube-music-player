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
}

export default PlayerPage;