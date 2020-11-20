import styles from './Screen.module.scss';

class Screen {
  constructor() {
    this.self = document.createElement('section');
    this.self.classList.add(styles.screen);
  }
}

export default Screen;