import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import MyPage from "../pages/MyPage";
import MembersPage from "../pages/MembersPage";
import MemberDetailPage from "../pages/MemberDetailPage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/members" element={<MembersPage />} />
      <Route path="/members/:id" element={<MemberDetailPage />} />
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  );
}

export default Router;
