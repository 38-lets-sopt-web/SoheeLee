import { useState } from 'react';

function Ranking() {
  const [rankings, setRankings] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('rankings') || '[]');
    return saved.sort((a, b) => b.level - a.level || b.score - a.score);
  });

  const handleReset = () => {
    if (window.confirm('랭킹을 초기화할까요?')) {
      localStorage.removeItem('rankings');
      setRankings([]);
    }
  };

  return (
    <div>
      <h2>랭킹 보드</h2>
      <button onClick={handleReset}>초기화</button>
      <table>
        <thead>
          <tr>
            <th>순위</th>
            <th>레벨</th>
            <th>점수</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((record, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>Level {record.level}</td>
              <td>{record.score}</td>
              <td>{record.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Ranking;