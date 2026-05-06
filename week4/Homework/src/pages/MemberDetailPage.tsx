import {useParams,useNavigate} from 'react-router-dom';

function MemberDetailPage() {
  const {memberId} = useParams();
  const navigate = useNavigate();
    return (    
        <main>  
            <h1>상세 정보</h1>
            <button type="button" onClick={() => navigate('/members')}>
        뒤로가기
      </button>
      <section>
            <p>회원 ID: {memberId}</p>
            <p>이름:추후 api 연결</p>
            <p>아이디:추후 api 연결</p>
            <p>이메일:추후 api 연결</p>
            <p>나이:추후 api 연결</p>
            <p>파트:추후 api 연결</p>
            </section>
        </main>
    )
}

export default MemberDetailPage;