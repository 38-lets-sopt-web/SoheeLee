import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "@/api/axios";
import axios from "axios";

function SignupPage() {
  const navigate = useNavigate();
  const [signupForm, setSignupForm] = useState({
    signupId: "",
    password: "",
    name: "",
    email: "",
    age: "",
    part: "",
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignupForm({
      ...signupForm,
      [name]: value,
    });
  };
  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const signupData = {
        loginId: signupForm.signupId,
        password: signupForm.password,
        name: signupForm.name,
        email: signupForm.email,
        age: Number(signupForm.age),
        part: signupForm.part,
      }; 

      await api.post("/api/v1/auth/signup", signupData);
      console.log("회원가입 성공");
      alert("회원가입이 완료되었습니다!");
      navigate("/login");
    }  catch (error) {
  alert("회원가입에 실패했습니다.");

  if (axios.isAxiosError(error)) {
    console.error("에러 상태 코드:", error.response?.status);
    console.error("에러 응답 데이터:", error.response?.data);
    console.error("내가 보낸 데이터:", {
      loginId: signupForm.signupId,
      password: signupForm.password,
      name: signupForm.name,
      email: signupForm.email,
      age: Number(signupForm.age),
      part: signupForm.part,
    });
    return;
  }

  console.error("알 수 없는 에러:", error);
}
  };

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
