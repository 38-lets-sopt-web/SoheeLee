import { Link } from "react-router-dom";

function SignupPage() {
  return (
    <main>
      <h1>회원가입</h1>

      <form>
        <div>
          <label htmlFor="signupId">아이디</label>
          <input
            type="text"
            id="signupId"
            name="signupId"
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
        <div>
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="이름을 입력하세요"
          />
        </div>
        <div>
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="이메일을 입력하세요"
          />
        </div>
        <div>
          <label htmlFor="age">나이</label>
          <input
            type="number"
            id="age"
            name="age"
            placeholder="나이를 입력하세요"
          />
        </div>
        <div>
          <label htmlFor="part">파트</label>
          <input
            type="text"
            id="part"
            name="part"
            placeholder="파트를 입력하세요"
          />
        </div>

        <button type="submit">회원가입</button>
      </form>
      <p>
        이미 계정이 있나요? <Link to="/login">로그인</Link>
      </p>
    </main>
  );
}

export default SignupPage;