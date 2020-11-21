import './index.scss';
import './scrollBar.scss';
import './progressBar.scss';
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
    playerVars: {
      color: 'white',
      controls: 0,
    },
    videoId: videos[0].videoId,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  playerPage.setCurrentVideoId(videos[0].videoId);
  playerPage.setPlayer(player);
  playerPage.appendProgressBar();
  playerPage.appendPlayButtons();
  playerPage.appendCueList(videos);
  playerPage.setTitleColor(videos[0].videoId);
  playerPage.setProgressBar();
}

function onPlayerStateChange({ data }) {
  console.log('data:', data)
  if (data === 0) { // 종료
    playerPage.playNextVideo();
  } else if (data === 1) { // 재생
    playerPage.revealPauseButton();
    if (!playerPage.isSetProgressBar) { // 음악이 바뀌고 처음 재생 될 때
      playerPage.setProgressBar(); 
      playerPage.setTimer(); 
    } else {
      playerPage.setTimer(playerPage.progressBar.value); 
    }
  } else if (data == 2) { // 일시 중지
    playerPage.revealPlayButton();
    playerPage.clearTimer();
  }
}