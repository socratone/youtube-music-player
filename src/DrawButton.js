import getText from './getText.js';
import './DrawButton.scss';

class DrawButton {
  constructor() {
    this.button = document.createElement('button');
    this.button.classList.add('draw-button');
    this.button.textContent = '클릭';
  }

  setScreen(target) {
    this.target = target;
  }

  appendToParent(parent) {
    this.button.addEventListener('click', () => {
      getText()
        .then(json => this.target.append(json.title));
    });
    parent.append(this.button);
  }
}

export default DrawButton;