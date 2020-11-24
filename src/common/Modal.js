import styles from './Modal.module.scss';

class Modal {
  constructor(size = 'medium') { // size: 'small' | 'medium' | 'large'
    this.size = size; 
    this.isInput = false;
  }

  setTitle(title) { // title: string
    this.title = title;
  }

  setDescription(description) { // description: string, 줄바꿈을 위해 <br>을 넣을 수 있다.
    this.description = description;
  }

  setButtons(ok, cancel) { // ok: string, cancel?: string
    if (cancel) this.buttons = [ok, cancel];
    else this.buttons = [ok];
  }

  setInput(inputWidth) { // inputWidth?: string
    this.isInput = true;
    this.inputWidth = inputWidth;
  }

  // callback: function, this.input.value로 input의 value를 가져올 수 있다.
  setCallback(callback) { 
    this.callback = callback;
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
        this.input = document.createElement('input');
        this.input.type = 'text';
        this.input.classList.add(styles.modalInput);
        
        const inputWrap = document.createElement('p');
        inputWrap.classList.add(styles.modalInputWrap);
        if (this.inputWidth !== undefined) inputWrap.style.width = this.inputWidth;
        inputWrap.append(this.input);
        secondLine.append(inputWrap);
      }
    };
    
    const createThirdLine = () => {
      thirdLine = document.createElement('div');
      thirdLine.classList.add(styles.thirdLine);
      
      const firstButton = document.createElement('button');
      firstButton.classList.add(styles.button);

      if (this.callback) {
        firstButton.addEventListener('click', () => {
          this.callback();
          this.clear();
        });
      } else {
        firstButton.addEventListener('click', () => this.clear());
      }

      if (this.buttons[0]) {
        firstButton.innerHTML = this.buttons[0];
      } else {
        firstButton.innerHTML = '확인';
      }

      thirdLine.append(firstButton);
      
      if (this.buttons[1]) {
        const cancelButton = document.createElement('button');
        cancelButton.classList.add(styles.button);
        cancelButton.innerHTML = this.buttons[1];
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