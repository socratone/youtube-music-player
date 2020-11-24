import {
  getByLabelText,
  getAllBy,
  getByText,
  getByTestId,
  queryAllBy,
  queryByTestId,
  waitFor,
} from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import Modal from '../Modal.js';

describe('Unit Test', () => {
  let modal;
  beforeEach(() => {
    modal = new Modal('medium');
  });
  
  describe('setTitle 메소드', () => {
    it('title이 정확히 들어가야 한다.', () => {
      modal.setTitle('any');
      expect(modal.title).toBe('any');
    });
  });
    
  describe('setDescription 메소드', () => {
    it('description이 정확히 들어가야 한다.', () => {
      modal.setDescription('any');
      expect(modal.description).toBe('any');
    });
  });

  describe('setButtons 메소드', () => {
    it('첫 번째 인자가 들어 왔을 때 첫 번째 버튼에만 값이 있어야 한다.', () => {
      modal.setButtons('any');
      expect(modal.buttons[0]).toBe('any');
      expect(modal.buttons[1]).toBe(undefined);
    });

    it('두 번째 인자가 들어 왔을 때 두 버튼에 모두 값이 있어야 한다.', () => {
      modal.setButtons('any', 'body');
      expect(modal.buttons[0]).toBe('any');
      expect(modal.buttons[1]).toBe('body');
    });
  });

  describe('setInput 메소드', () => {
    it('메소드가 호출되면 isInput이 true가 돼야 한다.', () => {
      expect(modal.isInput).toBeFalsy();
      modal.setInput();
      expect(modal.isInput).toBe(true);
    });

    it('inputWidth가 정확히 들어가야 한다.', () => {
      modal.setInput('100%');
      expect(modal.inputWidth).toBe('100%');
    });
  });
  
  describe('setExecutedFunction 메소드', () => {
    it('setExecutedFunction이 정확히 들어가야 한다.', () => {
      const func = () => {};
      modal.setExecutedFunction(func);
      expect(modal.executedFunction).toBe(func);
    });
  });
});

describe('DOM Test', () => {
  describe('새로운 재생 리스트를 만들 때 나오는 모달', () => {
    let modal;
    beforeEach(() => {
      document.body.innerHTML = '';
      modal = new Modal('medium');
      modal.setTitle('Playlist');
      modal.setDescription('새로 생성할 재생 리스트의 이름을 입력하세요.');
      modal.setButtons('OK', 'Cancel');
      modal.setInput('100%');
      modal.setExecutedFunction(() => { 
        // TODO: 재생 리스트 생성
        console.log('다음 이름으로 재생 리스트를 생성합니다:', modal.input.value)
      })
      modal.show(); 
    });

    it('setTitle로 지정한 string이 표시 돼야 한다.', () => {
      expect(document.body).toHaveTextContent('Playlist');
    });
    
    it('setDescripttion으로 지정한 string이 표시 돼야 한다.', () => {
      expect(document.body).toHaveTextContent('새로 생성할 재생 리스트의 이름을 입력하세요.');
    });

    it('setButtons로 지정한 string이 표시 돼야 한다.', () => {
      expect(document.body).toHaveTextContent('OK');
      expect(document.body).toHaveTextContent('Cancel');
    });

    it('입력 박스가 생성 돼야 한다.', () => {
      expect(document.querySelector('.modalInput')).toBeTruthy();
    });
    
    it('두 버튼이 생성 돼야 한다.', () => {
      expect(document.querySelectorAll('button')[0]).toHaveTextContent('OK');
      expect(document.querySelectorAll('button')[1]).toHaveTextContent('Cancel');
      expect(document.querySelectorAll('button').length).toBe(2);
    });

    // TODO: 기능 동작 테스트
  });
});