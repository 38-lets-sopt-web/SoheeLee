function MyPage() {
  return (
    <main>
        <h1>내 정보</h1>
    
    <section>
        <p>아이디: 추후 api 연결</p>
        <p>파트: 추후 api 연결</p>
    </section>

    <form>
        <div>
        <label htmlFor="name">이름</label>
        <input
            type="text"
            id="name"
            name="name"
            placeholder="이름을 입력하세요"
        />
        </div>
        <div>
        <label htmlFor="email">이메일</label>
        <input
            type="email"
            id="email"
            name="email"
            placeholder="이메일을 입력하세요"
        />
        </div>
        <div>
        <label htmlFor="age">나이</label>
        <input
            type="number"
            id="age"
            name="age"
            placeholder="나이를 입력하세요"
        />
        </div>
        <button type="submit">정보 수정</button>
    </form>
    </main>
  )
}

export default MyPage;