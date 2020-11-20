import styles from './Screen.module.scss';

class Screen {
  constructor() {
    this.element = document.createElement('section');
    this.element.classList.add(styles.screen);
  }

  append(element) {
    this.element.append(element);
  }
}

export default Screen;