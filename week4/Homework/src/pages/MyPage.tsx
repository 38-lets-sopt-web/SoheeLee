import { useEffect, useState } from "react";

import Header from "@/components/Header";
import api from "@/api/axios";

interface UserInfo {
  id: number;
  loginId: string;
  name: string;
  email: string;
  age: number;
  part: string;
}

function MyPage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const [myInfoForm, setMyInfoForm] = useState({
    name: "",
    email: "",
    age: "",
  });

  const fetchUserInfo = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const response = await api.get(`/api/v1/users/${userId}`);
      const userData = response.data.data;

      setUserInfo(userData);

      setMyInfoForm({
        name: userData.name,
        email: userData.email,
        age: String(userData.age),
      });

      console.log("회원 정보 조회 성공:", userData);
    } catch (error) {
      console.error("회원 정보 조회 실패:", error);
      alert("회원 정보 조회에 실패했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setMyInfoForm({
      ...myInfoForm,
      [name]: value,
    });
  };

  const handleUpdateMyInfo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    } 
    try {
      const updateData = {
        name: myInfoForm.name,
        email: myInfoForm.email,
        age: Number(myInfoForm.age),
      };
      const response = await api.patch(`/api/v1/users/${userId}`, updateData);
      console.log("내 정보 업데이트:", response.data);
      alert("내 정보가 업데이트되었습니다!");
    } catch (error) {
      console.error("내 정보 업데이트 실패:", error);
      alert("내 정보 업데이트에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <Header />

      <main>
        <h1>내 정보</h1>

        <section>
          <p>아이디: {userInfo?.loginId}</p>
          <p>파트: {userInfo?.part}</p>
        </section>

        <form onSubmit={handleUpdateMyInfo}>
          <div>
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="이름을 입력하세요"
              value={myInfoForm.name}
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
              value={myInfoForm.email}
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
              value={myInfoForm.age}
              onChange={handleChange}
            />
          </div>

          <button type="submit">정보 수정</button>
        </form>
      </main>
    </>
  );
}

export default MyPage;