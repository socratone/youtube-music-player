import styles from './Dropdown.module.scss';

const ARROW_HEIGHT = 8;
const ARROW_LENGTH = 16;

class Dropdown {
  constructor(size = 'medium') { // size: 'small' | 'medium' | 'large'
    this.size = size;
  }

  setTarget(target) { // target: DOMElement
    this.target = target;
  }

  setTitles(titles) { // titles: [string]
    this.titles = titles;
  }

  setCallbacks(callbacks) { // callbacks: [function]
    this.callbacks = callbacks;
  }

  setDirection(direction = 'down') { // direction: string
    this.direction = direction;
    if (direction === 'left') this.arrowDirection = 'arrowRight';
    else if (direction === 'right') this.arrowDirection = 'arrowLeft';
    else if (direction === 'up') this.arrowDirection = 'arrowDown';
    else this.arrowDirection = 'arrowUp';
  }

  setGap(gap = 0) { // gap: number, target과의 거리
    this.gap = gap;
  }

  setOffset(offset) { // offset: number, 올릴수록 화살표의 위치가 가운데로 움직인다.
    this.offset = offset;
  }

  show() {
    const createDropdownItems = () => {
      for (let i = 0; i < this.titles.length; i++) {
        const p = document.createElement('p');
        p.textContent = this.titles[i];
        
        const li = document.createElement('li');
        li.classList.add(styles.dropdownItem);
        li.addEventListener('click', () => {
          this.callbacks[i]();
          this.clear();
        });
        li.append(p);
        this.element.append(li);
      }
    };

    const setDropdownPosition = () => {
      if (this.direction === 'left') {
        this.element.style.left = `-${this.element.offsetWidth + this.gap}px`;
        this.element.style.top = '-' + this.offset + 'px';
      } else if (this.direction === 'right') {
        this.element.style.left = this.target.offsetWidth + this.gap + 'px';
        this.element.style.top = '-' + this.offset + 'px';
      } else if (this.direction === 'up') {
        this.element.style.top = `-${this.element.offsetHeight + this.gap}px`;
        this.element.style.left = '-' + this.offset + 'px';
      } else {
        this.element.style.top = this.target.offsetHeight + this.gap + 'px';
        this.element.style.left = '-' + this.offset + 'px';
      }
    };

    const createArrow = () => {
      const arrow = document.createElement('div');
      arrow.classList.add(styles[this.arrowDirection]);

      if (this.direction === 'left') {
        arrow.style.left = this.element.offsetWidth + 'px';
        const pxForCenter = (this.target.offsetHeight - ARROW_LENGTH) * 0.5;
        arrow.style.top = this.offset + pxForCenter + 'px';
      } else if (this.direction === 'right') {
        arrow.style.left = '-' + ARROW_HEIGHT + 'px';
        const pxForCenter = (this.target.offsetHeight - ARROW_LENGTH) * 0.5;
        arrow.style.top = this.offset + pxForCenter + 'px';
      } else if (this.direction === 'up') {
        arrow.style.bottom = '-' + ARROW_HEIGHT + 'px';
        const pxForCenter = (this.target.offsetWidth - ARROW_LENGTH) * 0.5;
        arrow.style.left = this.offset + pxForCenter + 'px';
      } else {
        arrow.style.top = '-' + ARROW_HEIGHT + 'px';
        const pxForCenter = (this.target.offsetWidth - ARROW_LENGTH) * 0.5;
        arrow.style.left = this.offset + pxForCenter + 'px';
      }

      this.element.append(arrow);
    };

    this.element = document.createElement('ul');
    this.element.classList.add(styles.dropdown);
    
    createDropdownItems();
    this.target.append(this.element);
    createArrow();
    setDropdownPosition();
  }

  clear() {
    this.element.remove();
  }
}

export default Dropdown;