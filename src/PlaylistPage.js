import styles from './PlaylistPage.module.scss';
import Page from './Page';

class PlaylistPage extends Page {
  constructor() {
    super();
    this.id = 'playlist';
    this.title = '재생리스트';
    this.element.textContent = 'playlist';
  }
}

export default PlaylistPage;