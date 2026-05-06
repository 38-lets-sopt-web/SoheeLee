import Header from '../components/Header';
import { useState } from 'react';

function MembersPage() {
    const [memberId, setMemberId] = useState('');

    const handleSearchMember = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // 아직 API 연결 전이라 입력값이 잘 저장되는지 확인하기 위해 콘솔에 출력    
        console.log('회원 ID 검색:', memberId); 
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
        <button 
        type="submit"
        disabled={memberId === ''}
        >검색</button>
        </form>
        </section>

        <section>
        <h2>검색 결과</h2>
        <p>회원 정보: 추후 api 연결</p>
        </section>

        <section>
        <h2>전체 멤버 리스트</h2>
        <ul>
            <li>회원 1: 추후 api 연결</li>
        </ul>
        </section>
    </main>
    </>
  )
}

export default MembersPage;