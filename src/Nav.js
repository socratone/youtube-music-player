import styles from './Nav.module.scss';

class Nav {
  constructor() {
    this.element = document.createElement('nav');
    this.element.classList.add(styles.nav);
  }

  append(items) {
    items.forEach(item => {
      const div = document.createElement('div');
      div.append(item.title);
      this.element.append(div);
    });
  }
}

export default Nav;