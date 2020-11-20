import styles from './Playlist.module.scss';
import Page from './Page';

class Playlist extends Page {
  constructor() {
    super();
    this.id = 'playlist';
    this.title = '재생리스트';
    this.element.textContent = 'playlist';
  }
}

export default Playlist;