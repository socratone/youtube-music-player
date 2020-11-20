import './index.scss';
import Nav from './Nav';
import Screen from './Screen';
import Playlist from './Playlist';
import Player from './Player';
import Search from './Search';

let playlist, player, search;

function init() {
  const screen = new Screen();
  document.body.append(screen.element);

  const nav = new Nav();

  playlist = new Playlist();
  player = new Player();
  search = new Search();
  playlist.show();
  player.hide();
  search.hide();

  nav.append(playlist);
  nav.append(player);
  nav.append(search);

  screen.append(nav.element);
  
  screen.append(playlist.element)
  screen.append(player.element)
  screen.append(search.element)
}

init();