import styles from './Page.module.scss';

class Page {
  constructor() {
    this.element = document.createElement('main');
    this.element.classList.add(styles.page)
  }

  show() {
    this.element.style.display = 'block';
  }

  hide() {
    this.element.style.display = 'none';
  }
}

export default Page;