import { useState, useEffect } from 'react';

const LEVEL_CONFIG = {
  1: { size: 2, time: 15 },
  2: { size: 3, time: 20 },
  3: { size: 4, time: 30 },
};

function Game() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isPlaying, setIsPlaying] = useState(false);
  const [holes, setHoles] = useState([null, null, null, null]);
  const [level, setLevel] = useState(1);

  // 게임 타이머
  useEffect(() => {
    if (!isPlaying) return;

    if (timeLeft === 0) {
    setIsPlaying(false);
    setHoles(Array(LEVEL_CONFIG[level].size * LEVEL_CONFIG[level].size).fill(null));
    alert(`게임 종료! 최종 점수: ${score}`);
    return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  // 두더지와 폭탄 생성 타이머
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
};

  const handleStart = () => {
  const size = LEVEL_CONFIG[level].size;
  setScore(0);
  setTimeLeft(LEVEL_CONFIG[level].time);
  setIsPlaying(true);
  setHoles(Array(size * size).fill(null)); // 레벨에 따라 구멍 개수 달라짐
};

 const handleClick = (index) => {
  if (!isPlaying) return;
  if (holes[index] === null) return;

  if (holes[index] === 'mole') {
    setScore((prev) => prev + 1);
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
    setHoles((prev) => {
      const newHoles = [...prev];
      newHoles[index] = null;
      return newHoles;
    });
  }
};

return (
  <div>
    <div>
      <p>남은 시간: {timeLeft}</p>
      <p>총 점수: {score}</p>
    </div>
    <div>
      <select 
        value={level} 
        onChange={(e) => setLevel(Number(e.target.value))}
        disabled={isPlaying}
      >
        <option value={1}>Level 1</option>
        <option value={2}>Level 2</option>
        <option value={3}>Level 3</option>
      </select>
    </div>
    <div>
      {holes.map((hole, index) => (
        <div key={index} onClick={() => handleClick(index)}>
          {hole === null && '구멍'}
          {hole === 'mole' && '🐭'}
          {hole === 'hit' && '💥'}
          {hole === 'bomb' && '💣'}
        </div>
      ))}
    </div>
    <button onClick={handleStart} disabled={isPlaying}>시작</button>
    {isPlaying && <button onClick={handleStop}>중단</button>}
  </div>
);
}

export default Game;