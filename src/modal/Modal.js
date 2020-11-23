import styles from './Modal.module.scss';

class Modal {
  constructor(size = 'medium') {
    this.size = size; // small, medium, large
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

  setExecutedFunction(executedFunction) {
    this.executedFunction = executedFunction;
  }

  show() {
    let firstLine, secondLine, thirdLine;
    const createFirstLine = () => {
      const title = document.createElement('p');
      title.classList.add(styles.title);
      title.textContent = this.title;
  
      const xButton = document.createElement('span');
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
      description.textContent = this.description;
      
      secondLine = document.createElement('div');
      secondLine.classList.add(styles.secondLine);
      secondLine.append(description);
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
    
    const modal = document.createElement('section');
    modal.classList.add(styles.modal);
    modal.append(firstLine, secondLine, thirdLine);
    
    this.element = document.createElement('div');
    this.element.classList.add(styles.modalWrap);
    this.element.append(modal);

    document.body.append(this.element);
  }

  clear() {
    this.element.remove();
  }
}

export default Modal;