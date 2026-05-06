import Header from '../components/Header';
import { useState } from 'react';

function MyPage() {
    const [MyInfoForm, setMyInfoForm] = useState({
        name: '',
        email: '',
        age: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setMyInfoForm({
            ...MyInfoForm,
            [name]: value,
        });
    };

     const handleUpdateMyInfo = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // 아직 API 연결 전이라 입력값이 잘 저장되는지 확인하기 위해 콘솔에 출력
        console.log('내 정보 수정:', MyInfoForm);
    };

  return ( 
    <>
    <Header />
    <main>
        <h1>내 정보</h1>
    
    <section>
        <p>아이디: 추후 api 연결</p>
        <p>파트: 추후 api 연결</p>
    </section>

    <form onSubmit={handleUpdateMyInfo}>
        <div>
        <label htmlFor="name">이름</label>
        <input
            type="text"
            id="name"
            name="name"
            placeholder="이름을 입력하세요"
            value={MyInfoForm.name}
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
            value={MyInfoForm.email}
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
            value={MyInfoForm.age}
            onChange={handleChange}
        />
        </div>
        <button type="submit">정보 수정</button>
    </form>
    </main>
    </>
  )
}
 
export default MyPage;