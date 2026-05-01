import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Modal from '../modal/modal';

const LEVEL_CONFIG = {
  1: { size: 2, time: 15 },
  2: { size: 3, time: 20 },
  3: { size: 4, time: 30 },
};

const GameWrapper = styled.div`
  display: flex;
  padding: 2rem;
  gap: 2rem;
  width: 100%;
`;

const StatusPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 18rem;
`;

const StatusBox = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 2.5rem;
  box-shadow: 0 0.125rem 0.5rem rgba(0,0,0,0.1);
  text-align: center;
`;

const StatusLabel = styled.p`
  font-size: 0.75rem;
  color: #888;
`;

const StatusValue = styled.p`
  font-size: 1.75rem;
  font-weight: bold;
  color: #4a90e2;
`;

const BoardWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const BoardContainer = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 0.125rem 0.5rem rgba(0,0,0,0.1);
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LevelSelect = styled.select`
  padding: 0.5rem 2rem 0.5rem 1rem;
  border-radius: 1.25rem;
  border: 0.125rem solid #4a90e2;
  margin-bottom: 1rem;
  font-size: 1rem;
  cursor: pointer;
  background-color: white;
  color: #4a90e2;
  font-weight: bold;
  outline: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%234a90e2' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.size}, 1fr);
  gap: 1rem;
  width: 100%;
  height: 100%;
  max-width: 600px;
`;

const Hole = styled.div`
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: #b0d4f1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  cursor: pointer;
  transition: transform 0.1s;
  &:hover {
    transform: scale(1.05);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.625rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  background-color: ${(props) => props.danger ? '#ff4d4d' : '#4a90e2'};
  color: white;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

function Game() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isPlaying, setIsPlaying] = useState(false);
  const [holes, setHoles] = useState(Array(LEVEL_CONFIG[1].size * LEVEL_CONFIG[1].size).fill(null));
  const [level, setLevel] = useState(1);
  const [successCount, setSuccessCount] = useState(0);
  const [failCount, setFailCount] = useState(0);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    if (timeLeft === 0) {
      setIsPlaying(false);
      setHoles(Array(LEVEL_CONFIG[level].size * LEVEL_CONFIG[level].size).fill(null));
      const record = {
        level: level,
        score: score,
        date: new Date().toLocaleString(),
      };
      const existing = JSON.parse(localStorage.getItem('rankings') || '[]');
      localStorage.setItem('rankings', JSON.stringify([...existing, record]));
      setShowModal(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  useEffect(() => {
    if (!isPlaying) return;
    const moleTimer = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * LEVEL_CONFIG[level].size * LEVEL_CONFIG[level].size);
      const type = Math.random() < 0.7 ? 'mole' : 'bomb';
      setHoles((prev) => {
        const newHoles = [...prev];
        newHoles[randomIndex] = type;
        return newHoles;
      });
      setTimeout(() => {
        setHoles((prev) => {
          const newHoles = [...prev];
          if (newHoles[randomIndex] !== 'hit') {
            newHoles[randomIndex] = null;
          }
          return newHoles;
        });
      }, 1000);
    }, 1500);
    return () => clearInterval(moleTimer);
  }, [isPlaying]);

  const handleStop = () => {
    setIsPlaying(false);
    setScore(0);
    setTimeLeft(LEVEL_CONFIG[level].time);
    setHoles(Array(LEVEL_CONFIG[level].size * LEVEL_CONFIG[level].size).fill(null));
    setSuccessCount(0);
    setFailCount(0);
    setMessage('');
  };

  const handleStart = () => {
    const size = LEVEL_CONFIG[level].size;
    setScore(0);
    setTimeLeft(LEVEL_CONFIG[level].time);
    setIsPlaying(true);
    setHoles(Array(size * size).fill(null));
    setSuccessCount(0);
    setFailCount(0);
    setMessage('');
  };

  const handleClick = (index) => {
    if (!isPlaying) return;
    if (holes[index] === null) return;
    if (holes[index] === 'mole') {
      setScore((prev) => prev + 1);
      setSuccessCount((prev) => prev + 1);
      setMessage('성공! 🎉');
      setHoles((prev) => {
        const newHoles = [...prev];
        newHoles[index] = 'hit';
        return newHoles;
      });
      setTimeout(() => {
        setHoles((prev) => {
          const newHoles = [...prev];
          newHoles[index] = null;
          return newHoles;
        });
      }, 700);
    } else if (holes[index] === 'bomb') {
      setScore((prev) => prev - 1);
      setFailCount((prev) => prev + 1);
      setMessage('실패! 💣');
      setHoles((prev) => {
        const newHoles = [...prev];
        newHoles[index] = null;
        return newHoles;
      });
    }
  };

  return (
    <GameWrapper>
      <StatusPanel>
        <StatusBox>
          <StatusLabel>남은 시간</StatusLabel>
          <StatusValue>{timeLeft}</StatusValue>
        </StatusBox>
        <StatusBox>
          <StatusLabel>총 점수</StatusLabel>
          <StatusValue>{score}</StatusValue>
        </StatusBox>
        <StatusBox>
          <StatusLabel>성공</StatusLabel>
          <StatusValue>{successCount}</StatusValue>
        </StatusBox>
        <StatusBox>
          <StatusLabel>실패</StatusLabel>
          <StatusValue>{failCount}</StatusValue>
        </StatusBox>
        <StatusBox>
          <StatusLabel>안내 메시지</StatusLabel>
          <StatusValue style={{fontSize: '16px'}}>{message}</StatusValue>
        </StatusBox>
      </StatusPanel>
      <BoardWrapper>
        <LevelSelect
        value={level}
        onChange={(e) => {
        const newLevel = Number(e.target.value);
        setLevel(newLevel);
        setHoles(Array(LEVEL_CONFIG[newLevel].size * LEVEL_CONFIG[newLevel].size).fill(null));
            }}
        disabled={isPlaying}
        >
          <option value={1}>Level 1</option>
          <option value={2}>Level 2</option>
          <option value={3}>Level 3</option>
        </LevelSelect>
        <Board size={LEVEL_CONFIG[level].size}>
          {holes.map((hole, index) => (
            <Hole key={index} onClick={() => handleClick(index)}>
              {hole === null && ''}
              {hole === 'mole' && '🐭'}
              {hole === 'hit' && '💥'}
              {hole === 'bomb' && '💣'}
            </Hole>
          ))}
        </Board>
        <ButtonGroup>
          <Button onClick={handleStart} disabled={isPlaying}>시작</Button>
          {isPlaying && <Button danger onClick={handleStop}>중단</Button>}
        </ButtonGroup>
      </BoardWrapper>
      {showModal && (
        <Modal score={score} onClose={() => setShowModal(false)} />
      )}
    </GameWrapper>
  );
}

export default Game;