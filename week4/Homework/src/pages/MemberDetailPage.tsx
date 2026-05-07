import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
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
      <main>
        <h1>상세 정보</h1>
        <button type="button" onClick={() => navigate("/members")}>
          뒤로가기
        </button>
        <section>
          {member ? (
            <>
              <p>이름: {member.name}</p>
              <p>아이디: {member.loginId}</p>
              <p>이메일: {member.email}</p>
              <p>나이: {member.age}</p>
              <p>파트: {member.part}</p>
            </>
          ) : (
            <p>회원 정보를 불러오는 중입니다.</p>
          )}
        </section>
      </main>
    </>
  );
}

export default MemberDetailPage;
