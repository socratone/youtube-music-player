import './index.scss';
import Nav from './Nav';
import Screen from './Screen';
import navList from './data/navList';

function init() {
  const screen = new Screen();
  document.body.append(screen.element);

  const nav = new Nav();
  nav.append(navList);
  screen.append(nav.element);
}

init();