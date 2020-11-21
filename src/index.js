import './index.scss';
import './scrollBar.scss';
import Nav from './Nav';
import Screen from './Screen';
import PlaylistPage from './PlaylistPage';
import PlayerPage from './PlayerPage';
import SearchPage from './SearchPage';

import { videos } from './common/fakeData';

let playerPage, player;

function init() {
  const screen = new Screen();
  document.body.append(screen.element);

  const nav = new Nav();
  
  const playlistPage = new PlaylistPage();
  playerPage = new PlayerPage();
  const searchPage = new SearchPage();
  
  playlistPage.setPageHeight();
  playlistPage.hide();
  
  playerPage.setPageHeight();
  playerPage.show();
  playerPage.appendYoutubeVideo();

  searchPage.setPageHeight();
  searchPage.hide();

  nav.append(playlistPage);
  nav.append(playerPage);
  nav.append(searchPage);

  screen.append(nav.element);

  screen.append(playlistPage.element)
  screen.append(playerPage.element)
  screen.append(searchPage.element)

  window.addEventListener('resize', () => {
    playlistPage.setPageHeight();
    playerPage.setPageHeight();
    searchPage.setPageHeight();
  });
}

init();

window.onYouTubeIframeAPIReady = function() {
  player = new YT.Player('youtube-video', {
    videoId: videos[0].videoId,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  playerPage.setPlayer(player);
  playerPage.appendPlayButtons();
  playerPage.appendCueList(videos);
}

function onPlayerStateChange(event) {

}