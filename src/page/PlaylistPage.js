import styles from './PlaylistPage.module.scss';
import Page from './Page';

class PlaylistPage extends Page {
  constructor() {
    super();
    this.id = 'playlist';
    this.icon = 'fa-list-ul';
  }

  appendPlaylist(userLists) {
    const listWrap = document.createElement('ul');
    listWrap.classList.add(styles.listWrap);
    
    userLists.forEach(userList => {
      const li = document.createElement('li');
      li.classList.add(styles.list);

      const setThumbnail = () => {
        const thumbnail = document.createElement('div');
        thumbnail.classList.add(styles.listThumbnail);
        thumbnail.style.backgroundImage = `url(https://i.ytimg.com/vi/${userList.videos[0].videoId}/mqdefault.jpg)`;
        
        let hover;
        const setHover = () => {
          hover = document.createElement('div');
          hover.classList.add(styles.listThumbnailHover);
  
          hover.addEventListener('mouseover', () => {
            hover.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
          });
          
          hover.addEventListener('mouseout', () => {
            hover.style.backgroundColor = '';
          });
        }
        setHover();

        const wrap = document.createElement('div');
        wrap.classList.add(styles.listThumbnailWrap);
        wrap.append(thumbnail);
        wrap.append(hover);

        li.append(wrap);
      };

      const setTitle = () => {
        const title = document.createElement('div');
        title.classList.add(styles.listTitle);
        title.innerHTML = userList.title;

        title.addEventListener('click', () => {
          console.log('list를 클릭했습니다.')
        });

        li.append(title);
      };

      setThumbnail();
      setTitle();

      listWrap.append(li);
    });

    this.element.append(listWrap);
  }
}

export default PlaylistPage;