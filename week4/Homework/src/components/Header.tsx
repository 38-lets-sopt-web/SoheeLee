import {useNavigate} from 'react-router-dom';
import { useEffect,useState } from 'react';
import api from '../api/axios';

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
    <header>
        <div>
        <h1>SOPT MEMBERS</h1>
        <p>안녕하세요, {userName||'사용자'}님!</p>
        </div>

        <nav>   
        <button type="button" onClick={() => navigate('/mypage')}>
        내 정보
      </button>

         <button type="button" onClick={() => navigate('/members')}>
        멤버 목록
      </button>    

        <button type="button" onClick={handleLogout}>
        로그아웃
        </button>
    

        </nav>
        </header> 
    );
}
export default Header;