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
});
