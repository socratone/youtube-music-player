import styles from './SearchPage.module.scss';
import Page from './Page';

class SearchPage extends Page {
  constructor() {
    super();
    this.id = 'search';
    this.icon = 'fa-search'
  }

  appendSearchComponent() {
    this.input = document.createElement('input');
    this.input.type = 'text';
    // TODO: 엔터키 눌렀을 때
   
    const button = document.createElement('a');
    button.innerHTML = '<i class="fa fa-search" aria-hidden="true"></i>';
    
    const buttonWrap = document.createElement('div');
    buttonWrap.classList.add(styles.buttonWrap);
    buttonWrap.append(button);
    buttonWrap.addEventListener('click', () => {
      const value = this.input.value;
    });

    const div = document.createElement('div');
    div.classList.add(styles.searchComponent);
    div.append(this.input, buttonWrap);
    this.element.append(div);
  }
}

export default SearchPage;