import './global/initialTag.scss';
import './global/scrollBar.scss';
import './global/progressBar.scss';
import Nav from './Nav';
import Screen from './Screen';
import PlaylistPage from './page/PlaylistPage';
import PlayerPage from './page/PlayerPage';
import SearchPage from './page/SearchPage';
import getPlaylist from './helper/getPlaylist';

import { videos, userLists } from './common/fakeData';

let playerPage, player;

async function init() {
  const screen = new Screen();
  document.body.append(screen.element);

  const playlistPage = new PlaylistPage();
  playlistPage.setPageHeight();
  const userLists = await getPlaylist();
  playlistPage.appendPlaylist(userLists);
  playlistPage.appendAddPlaylistButton();
  // playlistPage.show();
  playlistPage.hide();
  
  playerPage = new PlayerPage();
  playerPage.setPageHeight();
  playerPage.show();
  // playerPage.hide();
  playerPage.appendYoutubeVideo();
  
  const searchPage = new SearchPage();
  searchPage.setPlaylistPageInstance(playlistPage);
  searchPage.setPageHeight();
  searchPage.appendSearchComponent();
  const videos = searchPage.getSavedSearchResultList();
  searchPage.appendSearchResultList(videos);
  // searchPage.show();
  searchPage.hide();
  
  const nav = new Nav();
  nav.append(playlistPage);
  nav.append(playerPage);
  nav.append(searchPage);

  screen.append(nav.element);

  screen.append(playlistPage.element);
  screen.append(playerPage.element);
  screen.append(searchPage.element);

  playlistPage.setPlayerPageInstance(playerPage);
  searchPage.setPlayerPageInstance(playerPage);

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