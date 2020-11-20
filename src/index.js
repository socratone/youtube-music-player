import './index.scss';
import Screen from './Screen.js';

function init() {
  const screen = new Screen();
  document.body.append(screen.self);
}

init();