import styles from './Page.module.scss';

const NAV_HEIGHT = 40;

class Page {
  constructor() {
    this.element = document.createElement('main');
    this.element.classList.add(styles.page);
  }

  setPageHeight() {
    const pageHeight = window.innerHeight - NAV_HEIGHT;
    this.element.style.height = pageHeight + 'px';
  }

  show() {
    this.element.style.display = 'flex';
  }

  hide() {
    this.element.style.display = 'none';
  }
}

export default Page;