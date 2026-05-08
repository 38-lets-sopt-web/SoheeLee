import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import api from "@/api/axios";


interface User {
  id: number;
  loginId: string;
  name: string;
  email: string;
  age: number;
  part: string;
}

function MemberDetailPage() {
  const { memberId } = useParams();
  const navigate = useNavigate();

  const [member, setMember] = useState<User | null>(null);

  const fetchMemberDetail = async () => {
    if (!memberId) {
      alert("유효하지 않은 회원 ID입니다.");
      navigate("/members");
      return;
    }
    try {
      const response = await api.get(`/api/v1/users/${memberId}`);
      const memberData = response.data.data;
      setMember(memberData);
      console.log("회원 상세 정보 조회 성공:", memberData);
    } catch (error) {
      console.error("회원 상세 정보 조회 실패:", error);
      alert("회원 상세 정보 조회에 실패했습니다. 다시 시도해주세요.");
      navigate("/members");
    }
  };

  useEffect(() => {
    fetchMemberDetail();
  }, [memberId]);
return (
  <>
    <Header />

    <PageContainer>
      <PageTitle>상세 정보</PageTitle>

      <BackButton type="button" onClick={() => navigate("/members")}>
        ← 뒤로가기
      </BackButton>

      <DetailCard>
        {member ? (
          <>
            <InfoRow>
              <InfoLabel>이름</InfoLabel>
              <InfoValue>{member.name}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>아이디</InfoLabel>
              <InfoValue>{member.loginId}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>이메일</InfoLabel>
              <InfoValue>{member.email}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>나이</InfoLabel>
              <InfoValue>{member.age}세</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>파트</InfoLabel>
              <InfoValue>{member.part}</InfoValue>
            </InfoRow>
          </>
        ) : (
          <EmptyText>회원 정보를 불러오는 중입니다.</EmptyText>
        )}
      </DetailCard>
    </PageContainer>
  </>
);
}

export default MemberDetailPage;

const PageContainer = styled.main`
  width: 520px;
  margin: 170px auto 0;
`;

const PageTitle = styled.h1`
  margin-bottom: 28px;
  text-align: center;
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

const BackButton = styled.button`
  margin-bottom: 14px;

  color: ${({ theme }) => theme.colors.text};
  background-color: transparent;

  font-size: 16px;
  font-weight: 700;

  &:hover {
    color: ${({ theme }) => theme.colors.skyHover};
  }
`;

const DetailCard = styled.section`
  width: 100%;
  padding: 32px 28px;

  border-radius: ${({ theme }) => theme.radius.lg};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.card};

  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoLabel = styled.span`
  font-size: 17px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

const InfoValue = styled.span`
  font-size: 17px;
  color: ${({ theme }) => theme.colors.subText};
`;

const EmptyText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.subText};
`;
