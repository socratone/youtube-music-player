import DrawButton from './DrawButton.js';
import './index.scss';

const button = new DrawButton();
button.setScreen(document.getElementById('screen'));
button.appendToParent(document.body);