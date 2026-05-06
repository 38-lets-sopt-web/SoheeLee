import Header from '../components/Header';

function MembersPage() {
  return (
    <>
    <Header />
    <main> 
        <h1>회원 조회</h1>
        <section>
        <form>
        <div>
            <label htmlFor="memberId">회원 ID</label>
            <input
                type="text"
                id="memberId"
                name="memberId"
                placeholder="ID를 입력하세요"
            />
        </div>
        <button type="submit">검색</button>
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