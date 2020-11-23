import styles from './Modal.module.scss';

class Modal {
  constructor(size = 'medium') {
    this.size = size; // small, medium, large
    this.isInput = false;
  }

  setTitle(title) {
    this.title = title;
  }

  setDescription(description) {
    this.description = description;
  }

  setButtons(ok, cancel) {
    if (cancel) this.buttons = [ok, cancel];
    else this.buttons = [ok];
  }

  setInput() {
    this.isInput = true;
  }

  setExecutedFunction(executedFunction) {
    this.executedFunction = executedFunction;
  }

  show() {
    let firstLine, secondLine, thirdLine;
    const createFirstLine = () => {
      const title = document.createElement('p');
      title.classList.add(styles.title);
      title.textContent = this.title;
  
      const xButton = document.createElement('a');
      xButton.classList.add(styles.xButton);
      xButton.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
      xButton.addEventListener('click', () => this.clear());
      
      firstLine = document.createElement('div');
      firstLine.classList.add(styles.firstLine);
      firstLine.append(title, xButton);
    };
    
    const createSecondLine = () => {
      const description = document.createElement('p');
      description.classList.add(styles.description);
      description.innerHTML = this.description;
      
      secondLine = document.createElement('div');
      secondLine.classList.add(styles.secondLine);
      secondLine.append(description);

      if (this.isInput) {
        const tag = `<p><input id="modalInput" class="${styles.modalInput}" type="text"></input></p>`;
        secondLine.insertAdjacentHTML('beforeend', tag);
      }
    };
    
    const createThirdLine = () => {
      thirdLine = document.createElement('div');
      thirdLine.classList.add(styles.thirdLine);
      
      const firstButton = document.createElement('button');
      firstButton.classList.add(styles.button);
      if (this.buttons[0] === undefined) {
        firstButton.addEventListener('click', () => this.clear());
        firstButton.innerText = '확인';
      } else {
        firstButton.innerText = this.buttons[0];
        firstButton.addEventListener('click', () => {
          this.executedFunction();
          this.clear();
        });
      }
      thirdLine.append(firstButton);
      
      if (this.buttons[1]) {
        const cancelButton = document.createElement('button');
        cancelButton.classList.add(styles.button);
        cancelButton.innerText = this.buttons[1];
        cancelButton.addEventListener('click', () => this.clear());
        thirdLine.append(cancelButton);
      }
    };
    
    createFirstLine();
    createSecondLine();
    createThirdLine();
    
    this.modal = document.createElement('section');
    this.modal.classList.add(styles.modal);
    if (this.size === 'small') {
      this.modal.style.width = '200px';
    } else if (this.size === 'large') {
      this.modal.style.width = '100%';
      this.modal.style.margin = '30px';
    } 
    this.modal.append(firstLine, secondLine, thirdLine);

    this.modalWrap = document.createElement('div');
    this.modalWrap.classList.add(styles.modalWrap);
    this.modalWrap.append(this.modal)
    
    this.element = document.createElement('div');
    this.element.classList.add(styles.modalBackground);
    this.element.append(this.modalWrap);

    document.body.append(this.element);

    setTimeout(() => {
      this.element.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
      this.modalWrap.style.top = '0';
      this.modal.style.transform = 'scale(1)';
    }, 0)
  }
  
  clear() {
    setTimeout(() => {
      this.element.remove();
    }, 200);
  }
}

export default Modal;