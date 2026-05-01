import { useState, useEffect } from 'react';

function Game() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isPlaying, setIsPlaying] = useState(false);
  const [holes, setHoles] = useState([null, null, null, null]);

  useEffect(() => {
    if (!isPlaying) return;

    if (timeLeft === 0) {
      setIsPlaying(false);
      setHoles([null, null, null, null]);
      alert(`게임 종료! 최종 점수: ${score}`);
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
      const randomIndex = Math.floor(Math.random() * 4);
      const type = Math.random() < 0.7 ? 'mole' : 'bomb';

      setHoles((prev) => {
        const newHoles = [...prev];
        newHoles[randomIndex] = type;
        return newHoles;
      });

      setTimeout(() => {
        setHoles((prev) => {
          const newHoles = [...prev];
          newHoles[randomIndex] = null;
          return newHoles;
        });
      }, 1000);
    }, 1500);

    return () => clearInterval(moleTimer);
  }, [isPlaying]);

  const handleStart = () => {
    setScore(0);
    setTimeLeft(15);
    setIsPlaying(true);
    setHoles([null, null, null, null]);
  };

  const handleClick = (index) => {
  if (!isPlaying) return;
  if (holes[index] === null) return;

  if (holes[index] === 'mole') {
    setScore((prev) => prev + 1);
  } else if (holes[index] === 'bomb') {
    setScore((prev) => prev - 1);
  }

  setHoles((prev) => {
    const newHoles = [...prev];
    newHoles[index] = null;
    return newHoles;
  });
};

  return (
    <div>
      <div>
        <p>남은 시간: {timeLeft}</p>
        <p>총 점수: {score}</p>
      </div>
      <div>
        {holes.map((hole, index) => (
          <div key={index} onClick={() => handleClick(index)}>
            {hole === null && '구멍'}
            {hole === 'mole' && '🐭'}
            {hole === 'bomb' && '💣'}
          </div>
        ))}
      </div>
      <button onClick={handleStart}>시작</button>
    </div>
  );
}

export default Game;