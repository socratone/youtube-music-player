import styles from './SearchPage.module.scss';
import Page from './Page';
import getVideosByQuery from '../helper/getVideosByQuery';
import filterVideos from '../helper/filterVideos';

class SearchPage extends Page {
  constructor() {
    super();
    this.id = 'search';
    this.icon = 'fa-search'
  }

  appendSearchResultList(videos) {

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
    buttonWrap.addEventListener('click', async () => {
      const query = this.input.value;
      const data = await getVideosByQuery(query, 2);
      if (data.error) {
        return console.log(data.error.code, data.error.message);
      } 
      const videos = data.items;
      const filteredVideos = filterVideos(videos)
      console.log('filteredVideos:', filteredVideos)
      this.appendSearchResultList(filteredVideos);
    });

    const div = document.createElement('div');
    div.classList.add(styles.searchComponent);
    div.append(this.input, buttonWrap);
    this.element.append(div);
  }
}

export default SearchPage;