import styles from './SearchPage.module.scss';
import Page from './Page';

class SearchPage extends Page {
  constructor() {
    super();
    this.id = 'search';
    this.title = '검색';
    this.element.textContent = 'search';
  }
}

export default SearchPage;