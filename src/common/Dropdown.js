import styles from './Dropdown.module.scss';

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
  }

  setGap(gap = 0) { // gap: number
    this.gap = gap;
  }

  setOffset(offset) { // offset: number
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

    this.element = document.createElement('ul');
    this.element.classList.add(styles.dropdown);
    
    createDropdownItems();
    this.target.append(this.element);
    setDropdownPosition();
  }

  clear() {
    this.element.remove();
  }
}

export default Dropdown;