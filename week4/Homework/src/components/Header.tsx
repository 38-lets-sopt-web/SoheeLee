import styled from "@emotion/styled";
import {useNavigate} from 'react-router-dom';
import { useEffect,useState } from 'react';
import api from '@/api/axios';



function Header() {
  const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const fetchUserName = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            return;
        }
        try {
            const response = await api.get(`/api/v1/users/${userId}`);
            const userData = response.data.data;
            setUserName(userData.name);
        } catch (error) {
            console.error('회원 정보 조회 실패:', error);
        }
    };

    useEffect(() => {
        fetchUserName();
    }, []);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/login');
  };
  return (
    <HeaderWrapper>
        <TitleArea>
        <Title>SOPT MEMBERS</Title>
        <Greeting>안녕하세요, {userName||'사용자'}님!</Greeting>
        </TitleArea>

        <Nav>   
        <NavButton type="button" onClick={() => navigate('/mypage')}>
        내 정보
      </NavButton>

         <NavButton type="button" onClick={() => navigate('/members')}>
        멤버 목록
      </NavButton>    

        <NavButton type="button" onClick={handleLogout}>
        로그아웃
        </NavButton>
    

        </Nav>
        </HeaderWrapper> 
    );
}
export default Header;

const HeaderWrapper = styled.header`
  width: 100%;
  height: 80px;
  padding: 0 80px;
  background-color: ${({ theme }) => theme.colors.navy};
  color: ${({ theme }) => theme.colors.white};

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TitleArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 800;
  letter-spacing: 0.5px;
`;

const Greeting = styled.p`
  font-size: 12px;
  color: #d9e4ef;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const NavButton = styled.button`
  color: ${({ theme }) => theme.colors.white};
  background-color: transparent;
  font-size: 14px;
  font-weight: 700;

  &:hover {
    color: ${({ theme }) => theme.colors.sky};
  }
`;