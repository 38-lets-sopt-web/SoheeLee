import { createPortal } from 'react-dom';

function Modal({ score, onClose }) {
  return createPortal(
    <div>
      <div>
        <h2>게임 종료!</h2>
        <p>최종 점수: {score}</p>
        <button onClick={onClose}>확인</button>
      </div>
    </div>,
    document.getElementById('root')
  );
}

export default Modal;