import styles from './Search.module.scss';
import Page from './Page';

class Search extends Page {
  constructor() {
    super();
    this.id = 'search';
    this.title = '검색';
    this.element.textContent = 'search';
  }
}

export default Search;