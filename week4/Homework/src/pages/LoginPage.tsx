import {Link} from 'react-router-dom';

function LoginPage() {
  return (
    <main>
        <h1>로그인</h1>
        
        <form>
            <div>
            <label htmlFor="loginId">아이디</label>
            <input 
            type="text" 
            id="loginId"
            name="loginId"
            placeholder="아이디를 입력하세요"
            />
            </div>
            <div>
            <label htmlFor="password">비밀번호</label>
            <input 
            type="password" 
            id="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            />
            </div>
            <button type="submit">로그인</button>
        </form>
        <Link to="/signup">회원가입</Link>
    </main>
  );
}

export default LoginPage;