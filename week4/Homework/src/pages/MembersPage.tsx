import Header from "@/components/Header";
import { useState, useEffect } from "react";
import api from "@/api/axios";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

interface User {
  id: number;
  loginId: string;
  name: string;
  email: string;
  age: number;
  part: string;
}

function MembersPage() {
    const navigate = useNavigate();
  const [memberId, setMemberId] = useState("");
  const [members, setMembers] = useState<User[]>([]);
  const [searchResult, setSearchResult] = useState<User | null>(null);
  const fetchMembers = async () => {
    try {
      const response = await api.get("/api/v1/users");
      const membersData = response.data.data.users;
      setMembers(membersData);
      console.log("멤버 목록 조회 성공:", membersData);
    } catch (error) {
      console.error("멤버 목록 조회 실패:", error);
      alert("멤버 목록 조회에 실패했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);
  const handleSearchMember = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    try {
      const response = await api.get(`/api/v1/users/${memberId}`);
      const memberData = response.data.data;

      setSearchResult(memberData);

      console.log("회원 ID 검색 성공:", memberData);
    } catch (error) {
      console.error("회원 ID 검색 실패:", error);
      alert("해당 회원을 찾을 수 없습니다.");

      setSearchResult(null);
    }
  };

  return (
  <>
    <Header />

    <PageContainer>
      <PageTitle>회원 조회</PageTitle>

      <SearchSection>
        <SearchForm onSubmit={handleSearchMember}>
          <InputGroup>
            <Label htmlFor="memberId">회원 ID</Label>
            <Input
              type="text"
              id="memberId"
              name="memberId"
              placeholder="ID를 입력하세요"
              value={memberId}
              onChange={(event) => setMemberId(event.target.value)}
            />
          </InputGroup>

          <SubmitButton type="submit" disabled={memberId === ""}>
            검색
          </SubmitButton>
        </SearchForm>
      </SearchSection>

      <ResultSection>
        <SectionTitle>검색 결과</SectionTitle>

        <ResultCard>
          {searchResult ? (
            <>
              <InfoRow>
                <InfoLabel>아이디</InfoLabel>
                <InfoValue>{searchResult.loginId}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>이름</InfoLabel>
                <InfoValue>{searchResult.name}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>이메일</InfoLabel>
                <InfoValue>{searchResult.email}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>나이</InfoLabel>
                <InfoValue>{searchResult.age}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>파트</InfoLabel>
                <InfoValue>{searchResult.part}</InfoValue>
              </InfoRow>
            </>
          ) : (
            <EmptyText>원하는 ID를 검색해 보세요!</EmptyText>
          )}
        </ResultCard>
      </ResultSection>

      <MemberListSection>
        <SectionTitle>전체 멤버 리스트</SectionTitle>

        <MemberGrid>
          {members.map((member) => (
            <MemberCard
              key={member.id}
              type="button"
              onClick={() => navigate(`/members/${member.id}`)}
            >
              <MemberName>{member.name}</MemberName>
              <PartBadge>{member.part}</PartBadge>
            </MemberCard>
          ))}
        </MemberGrid>
      </MemberListSection>
    </PageContainer>
  </>
);
}

export default MembersPage;

const PageContainer = styled.main`
  width: 900px;
  margin: 80px auto 0;
`;

const PageTitle = styled.h1`
  margin-bottom: 28px;
  text-align: center;
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

const SearchSection = styled.section`
  width: 520px;
  margin: 0 auto 36px;
`;

const SearchForm = styled.form`
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

  border-radius: ${({ theme }) => theme.radius.sm};
  background-color: ${({ theme }) => theme.colors.sky};
  color: ${({ theme }) => theme.colors.white};

  font-size: 15px;
  font-weight: 700;

  &:hover {
    background-color: ${({ theme }) => theme.colors.skyHover};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const ResultSection = styled.section`
  width: 520px;
  margin: 0 auto 70px;
`;

const SectionTitle = styled.h2`
  margin-bottom: 18px;
  font-size: 20px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

const ResultCard = styled.div`
  min-height: 180px;
  padding: 28px;

  border-radius: ${({ theme }) => theme.radius.lg};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.card};

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoLabel = styled.span`
  font-size: 16px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

const InfoValue = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.subText};
`;

const EmptyText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.subText};
`;

const MemberListSection = styled.section`
  width: 100%;
`;

const MemberGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
`;

const MemberCard = styled.button`
  height: 96px;
  padding: 18px;

  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.card};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    transform: translateY(-3px);
  }
`;

const MemberName = styled.strong`
  font-size: 16px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

const PartBadge = styled.span`
  padding: 4px 10px;

  border-radius: 999px;
  background-color: #edf4fb;
  color: ${({ theme }) => theme.colors.subText};

  font-size: 12px;
  font-weight: 700;
`;