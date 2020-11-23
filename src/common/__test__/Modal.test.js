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

  describe('show 메소드', () => {

  });
});