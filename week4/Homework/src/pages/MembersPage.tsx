import Header from "@/components/Header";
import { useState, useEffect } from "react";
import api from "@/api/axios";
import { useNavigate } from "react-router-dom";

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
      <main>
        <h1>회원 조회</h1>
        <section>
          <form onSubmit={handleSearchMember}>
            <div>
              <label htmlFor="memberId">회원 ID</label>
              <input
                type="text"
                id="memberId"
                name="memberId"
                placeholder="ID를 입력하세요"
                value={memberId}
                onChange={(event) => setMemberId(event.target.value)}
              />
            </div>
            <button type="submit" disabled={memberId === ""}>
              검색
            </button>
          </form>
        </section>

        <section>
          <h2>검색 결과</h2>
          {searchResult ? (
            <div>
              <p>이름: {searchResult.name}</p>
              <p>아이디: {searchResult.loginId}</p>
              <p>이메일: {searchResult.email}</p>
              <p>나이: {searchResult.age}</p>
              <p>파트: {searchResult.part}</p>
            </div>
          ) : (
            <p>검색한 회원 정보가 여기에 표시됩니다.</p>
          )}
        </section>

        <section>
          <h2>전체 멤버 리스트</h2>
          <ul>
            {members.map((member) => (
              <li key={member.id}>
                <button
                  type="button"
                  onClick={() => navigate(`/members/${member.id}`)}>
                  {member.name} / {member.loginId} / {member.part}
                </button>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}

export default MembersPage;
