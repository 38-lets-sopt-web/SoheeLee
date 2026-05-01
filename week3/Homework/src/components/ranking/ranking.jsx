import { useState } from 'react';
import styled from '@emotion/styled';

const RankingWrapper = styled.div`
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #4a90e2;
  margin-bottom: 1.5rem;
`;

const ResetButton = styled.button`
  padding: 0.5rem 1.5rem;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 1.5rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 0.125rem 0.5rem rgba(0,0,0,0.1);
`;

const Th = styled.th`
  background-color: #4a90e2;
  color: white;
  padding: 1rem;
  text-align: center;
  font-size: 1rem;
`;

const Tr = styled.tr`
  &:nth-of-type(even) {
    background-color: #f0f8ff;
  }
`;

const Td = styled.td`
  padding: 1rem;
  text-align: center;
  font-size: 1rem;
  color: #333;
`;

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
    <RankingWrapper>
      <Title>랭킹 보드</Title>
      <ResetButton onClick={handleReset}>초기화</ResetButton>
      <Table>
        <thead>
          <tr>
            <Th>순위</Th>
            <Th>레벨</Th>
            <Th>점수</Th>
            <Th>날짜</Th>
            <Th>성공 시간</Th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((record, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>Level {record.level}</Td>
              <Td>{record.score}</Td>
              <Td>{record.date}</Td>
              <Td>{record.clearTime}초</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </RankingWrapper>
  );
}

export default Ranking;