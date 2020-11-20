import './index.scss';
import Nav from './Nav';
import Screen from './Screen';
import PlaylistPage from './PlaylistPage';
import PlayerPage from './PlayerPage';
import SearchPage from './SearchPage';

let playerPage, player;
const videos = [
  { videoId: 'QYNwbZHmh8g', title: '아이유 - Into the I-LAND' }, 
  { videoId: 'TgOu00Mf3kI', title: '아이유 - 에잇' }
];

function init() {
  const screen = new Screen();
  document.body.append(screen.element);

  const nav = new Nav();
  
  const playlistPage = new PlaylistPage();
  playerPage = new PlayerPage();
  const searchPage = new SearchPage();

  playlistPage.hide();

  playerPage.show();
  playerPage.appendYoutubeVideo();

  searchPage.hide();

  nav.append(playlistPage);
  nav.append(playerPage);
  nav.append(searchPage);

  screen.append(nav.element);

  screen.append(playlistPage.element)
  screen.append(playerPage.element)
  screen.append(searchPage.element)
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