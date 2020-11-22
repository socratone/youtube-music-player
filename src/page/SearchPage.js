import styles from './SearchPage.module.scss';
import Page from './Page';

class SearchPage extends Page {
  constructor() {
    super();
    this.id = 'search';
    this.icon = 'fa-search'
  }

  appendSearchComponent() {
    const input = document.createElement('input');
    input.type = 'text';
   
    const button = document.createElement('a');
    button.innerHTML = '<i class="fa fa-search" aria-hidden="true"></i>';
    
    const buttonWrap = document.createElement('div');
    buttonWrap.classList.add(styles.buttonWrap);
    buttonWrap.append(button);

    const div = document.createElement('div');
    div.classList.add(styles.searchComponent);
    div.append(input, buttonWrap);
    this.element.append(div);
  }
}

export default SearchPage;