import {Link,useNavigate} from 'react-router-dom';
import { useState } from 'react';
import styled from "@emotion/styled";
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
    <AuthPage>
    <AuthContainer>
        <Title>로그인</Title>
        
        <Form onSubmit={handleLogin}>
            <InputGroup>
            <Label htmlFor="loginId">아이디</Label>
            <Input 
            type="text" 
            id="loginId"
            name="loginId"
            placeholder="아이디를 입력하세요"
            value={loginId} 
            onChange={(event) => setLoginId(event.target.value)}
            />
            </InputGroup>
            <InputGroup>
            <Label htmlFor="password">비밀번호</Label>
            <Input 
            type="password" 
            id="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            />
            </InputGroup>
            <SubmitButton type="submit">로그인</SubmitButton>
        </Form>
             <GuideText>
        계정이 없나요? <SignupLink to="/signup">회원가입</SignupLink>
      </GuideText>
    </AuthContainer>
    </AuthPage>
  );
}

export default LoginPage;

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
  gap: 18px;
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

const SignupLink = styled(Link)`
  color: ${({ theme }) => theme.colors.skyHover};
  font-weight: 700;
`;