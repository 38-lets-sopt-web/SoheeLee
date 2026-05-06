import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };
  return (
    <header>
      <div>
        <h1>SOPT MEMBERS</h1>
        <p>안녕하세요, api로연결해야됨님!</p>
      </div>

      <nav>
        <button type="button" onClick={() => navigate("/mypage")}>
          내 정보
        </button>

        <button type="button" onClick={() => navigate("/members")}>
          멤버 목록
        </button>

        <button type="button" onClick={handleLogout}>
          로그아웃
        </button>
      </nav>
    </header>
  );
}

export default Header;
