import styles from './Nav.module.scss';

class Nav {
  constructor() {
    this.element = document.createElement('ul');
    this.element.classList.add(styles.nav);
    this.children = [];
  }

  append(instance) {
    this.children.push(instance);

    const li = document.createElement('li');
    li.append(instance.title);

    li.addEventListener('click', () => {
      this.children.forEach(page => page.hide());
      const [ clickedPage ] = this.children.filter(page => {
        return page.id === instance.id
      });
      clickedPage.show();
    });

    this.element.append(li);
  }
}

export default Nav;