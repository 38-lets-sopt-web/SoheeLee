import { createPortal } from 'react-dom';
import styled from '@emotion/styled';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2.5rem;
  text-align: center;
  box-shadow: 0 0.25rem 1.25rem rgba(0,0,0,0.2);
`;

const Title = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 1rem;
`;

const Score = styled.p`
  font-size: 3rem;
  font-weight: bold;
  color: #4a90e2;
  margin-bottom: 1.5rem;
`;

const CloseButton = styled.button`
  padding: 0.75rem 2rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
`;

function Modal({ score, onClose }) {
  return createPortal(
    <Overlay>
      <ModalBox>
        <Title>게임 종료! 🎉</Title>
        <Score>{score}점</Score>
        <CloseButton onClick={onClose}>확인</CloseButton>
      </ModalBox>
    </Overlay>,
    document.getElementById('root')
  );
}

export default Modal;