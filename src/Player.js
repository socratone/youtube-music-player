import styles from './Player.module.scss';
import Page from './Page';

class Player extends Page {
  constructor() {
    super();
    this.id = 'player';
    this.title = '플레이어';
    this.element.textContent = 'player';
  }
}

export default Player;