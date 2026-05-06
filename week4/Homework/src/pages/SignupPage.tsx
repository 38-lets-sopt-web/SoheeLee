import { Link } from "react-router-dom";
import { useState } from "react";

function SignupPage() {
    const [signupForm, setSignupForm] = useState({
        signupId: '',
        password: '',
        name: '',
        email: '',
        age: '',
        part: '',
    });
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;   
        setSignupForm({
            ...signupForm,
            [name]: value,
        });
    };
        const handleSignup = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        //api 연결 전이라 입력값이 잘 저장되는지 확인하기 위해 콘솔에 출력
        console.log('회원가입 정보:', signupForm);
    }

  return (
    <main>
      <h1>회원가입</h1>

      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="signupId">아이디</label>
          <input
            type="text"
            id="signupId"
            name="signupId"
            placeholder="아이디를 입력하세요"
            value={signupForm.signupId}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            value={signupForm.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="이름을 입력하세요"
            value={signupForm.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="이메일을 입력하세요"
            value={signupForm.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="age">나이</label>
          <input
            type="number"
            id="age"
            name="age"
            placeholder="나이를 입력하세요"
            value={signupForm.age}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="part">파트</label>
          <input
            type="text"
            id="part"
            name="part"
            placeholder="파트를 입력하세요"
            value={signupForm.part}
            onChange={handleChange}
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