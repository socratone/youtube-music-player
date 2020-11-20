import './index.scss';
import Nav from './Nav';
import Screen from './Screen';
import PlaylistPage from './PlaylistPage';
import PlayerPage from './PlayerPage';
import SearchPage from './SearchPage';

let playlistPage, playerPage, searchPage;

function init() {
  const screen = new Screen();
  document.body.append(screen.element);

  const nav = new Nav();

  playlistPage = new PlaylistPage();
  playerPage = new PlayerPage();
  searchPage = new SearchPage();
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

let player;
window.onYouTubeIframeAPIReady = function() {
  player = new YT.Player('youtube-video', {
    videoId: 'QYNwbZHmh8g',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
}

function onPlayerStateChange(event) {

}