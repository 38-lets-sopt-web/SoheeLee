import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "@emotion/styled";
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
  <AuthPage>
    <AuthContainer>
      <Title>회원가입</Title>

      <Form onSubmit={handleSignup}>
        <InputGroup>
          <Label htmlFor="signupId">아이디</Label>
          <Input
            type="text"
            id="signupId"
            name="signupId"
            placeholder="아이디를 입력하세요"
            value={signupForm.signupId}
            onChange={handleChange}
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            value={signupForm.password}
            onChange={handleChange}
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="name">이름</Label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="이름을 입력하세요"
            value={signupForm.name}
            onChange={handleChange}
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="email">이메일</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="이메일을 입력하세요"
            value={signupForm.email}
            onChange={handleChange}
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="age">나이</Label>
          <Input
            type="number"
            id="age"
            name="age"
            placeholder="나이를 입력하세요"
            value={signupForm.age}
            onChange={handleChange}
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="part">파트</Label>
          <Input
            type="text"
            id="part"
            name="part"
            placeholder="WEB"
            value={signupForm.part}
            onChange={handleChange}
          />
        </InputGroup>

        <SubmitButton type="submit">회원가입</SubmitButton>
      </Form>

      <GuideText>
        이미 계정이 있나요? <LoginLink to="/login">로그인</LoginLink>
      </GuideText>
    </AuthContainer>
  </AuthPage>
);
}

export default SignupPage;

const AuthPage = styled.main`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};

  display: flex;
  justify-content: center;
  align-items: center;
`;

const AuthContainer = styled.section`
  width: 520px;
`;

const Title = styled.h1`
  margin-bottom: 32px;

  text-align: center;
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
  width: 100%;
  height: 42px;
  padding: 0 14px;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  background-color: ${({ theme }) => theme.colors.white};

  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.sky};
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 44px;
  margin-top: 12px;

  border-radius: ${({ theme }) => theme.radius.sm};
  background-color: ${({ theme }) => theme.colors.sky};
  color: ${({ theme }) => theme.colors.white};

  font-size: 15px;
  font-weight: 700;

  &:hover {
    background-color: ${({ theme }) => theme.colors.skyHover};
  }
`;

const GuideText = styled.p`
  margin-top: 18px;

  text-align: center;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.subText};
`;

const LoginLink = styled(Link)`
  color: ${({ theme }) => theme.colors.skyHover};
  font-weight: 700;
`;
