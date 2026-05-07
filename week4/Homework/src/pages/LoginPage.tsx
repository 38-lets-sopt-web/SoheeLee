import {Link,useNavigate} from 'react-router-dom';
import { useState } from 'react';
import api from '@/api/axios';

function LoginPage() {
    const navigate = useNavigate();
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const loginData = {
                loginId,
                password,
            };
            const response = await api.post('/api/v1/auth/signin', loginData);
            
            console.log('로그인 성공:', response.data);
            

            const userId = response.data.data?.userId;
            console.log('로그인한 userId:', userId);

            if (userId) {
                localStorage.setItem('userId', String(userId));
            }

            alert('로그인에 성공했습니다!');    

            navigate('/mypage');
            
            
        } catch (error) {
            console.error('로그인 실패:', error);
            alert('로그인에 실패했습니다. 다시 시도해주세요.');
        }
    };
  return (
    <main>
        <h1>로그인</h1>
        
        <form onSubmit={handleLogin}>
            <div>
            <label htmlFor="loginId">아이디</label>
            <input 
            type="text" 
            id="loginId"
            name="loginId"
            placeholder="아이디를 입력하세요"
            value={loginId} 
            onChange={(event) => setLoginId(event.target.value)}
            />
            </div>
            <div>
            <label htmlFor="password">비밀번호</label>
            <input 
            type="password" 
            id="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            />
            </div>
            <button type="submit">로그인</button>
        </form>
        <Link to="/signup">회원가입</Link>
    </main>
  );
}

export default LoginPage;