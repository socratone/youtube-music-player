import styles from './PlaylistPage.module.scss';
import Page from './Page';

class PlaylistPage extends Page {
  constructor() {
    super();
    this.id = 'playlist';
    this.element.textContent = 'playlist';
    this.icon = 'fa-list-ul';
  }
}

export default PlaylistPage;