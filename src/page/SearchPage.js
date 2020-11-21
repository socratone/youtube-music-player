import styles from './SearchPage.module.scss';
import Page from './Page';

class SearchPage extends Page {
  constructor() {
    super();
    this.id = 'search';
    this.element.textContent = 'search';
    this.icon = 'fa-search'
  }
}

export default SearchPage;