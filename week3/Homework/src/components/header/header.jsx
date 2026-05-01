import styled from '@emotion/styled';

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background-color: #4a90e2;
  color: white;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 8px;
`;

const TabButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  background-color: ${(props) => props.active ? 'white' : 'transparent'};
  color: ${(props) => props.active ? '#4a90e2' : 'white'};
  font-weight: bold;
`;

function Header({ currentTab, setCurrentTab }) {
  return (
    <HeaderWrapper>
      <Title>두더지 게임</Title>
      <Nav>
        <TabButton active={currentTab === 'game'} onClick={() => setCurrentTab('game')}>게임</TabButton>
        <TabButton active={currentTab === 'ranking'} onClick={() => setCurrentTab('ranking')}>랭킹</TabButton>
      </Nav>
    </HeaderWrapper>
  );
}

export default Header;