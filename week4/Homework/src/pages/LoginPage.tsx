import {Link} from 'react-router-dom';
import { useState } from 'react';

function LoginPage() {
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // 아직 API 연결 전이라 입력값이 잘 저장되는지 확인하기 위해 콘솔에 출력
        console.log('아이디', loginId);
        console.log('비밀번호', password);
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