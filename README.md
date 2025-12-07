# 🦁 우당탕탕 커뮤니티 (Frontend)

> 카카오 테크 부트캠프 Leo 조의 커뮤니티 웹 애플리케이션 프론트엔드

[![React](https://img.shields.io/badge/React-18.2.0-61dafb?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646cff?logo=vite)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-6.20-ca4245?logo=react-router)](https://reactrouter.com/)




---

##  목차

- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [시작하기](#-시작하기)
- [프로젝트 구조](#-프로젝트-구조)
- [주요 화면](#-주요-화면)
- [API 연동](#-api-연동)


---

##  주요 기능

###  회원 관리
- **회원가입/로그인**: 이메일 기반 인증 시스템
- **프로필 관리**: 닉네임, 프로필 이미지 수정
- **비밀번호 변경**: 현재 비밀번호 확인 후 변경 가능
- **회원 탈퇴**: 안전한 계정 삭제 기능

###  게시글 관리
- **게시글 CRUD**: 작성, 조회, 수정, 삭제
- **이미지 업로드**: 게시글에 이미지 첨부 가능
- **조회수 추적**: 게시글 조회수 자동 집계
- **좋아요 기능**: 토글 방식의 좋아요 (추가/취소)

###  댓글 시스템
- **댓글 작성**: 게시글에 자유롭게 의견 작성
- **댓글 삭제**: 본인이 작성한 댓글만 삭제 가능
- **실시간 업데이트**: 댓글 작성/삭제 시 즉시 반영

###  UI/UX
- **"Fresh Morning Park" 테마**: 세이지 그린을 메인 컬러로 한 편안한 디자인
- **반응형 디자인**: 다양한 화면 크기에 최적화된 그리드 레이아웃
- **사용자 피드백**: 버튼 상태, 로딩 인디케이터, 에러 메시지 등 명확한 피드백

---

##  기술 스택

### Frontend Core
- **React 18.2** - UI 라이브러리
- **React Router DOM 6.20** - 클라이언트 사이드 라우팅
- **Vite 5.0** - 빌드 도구 및 개발 서버

### Styling
- **CSS Modules** - 컴포넌트 단위 스타일링
- **Custom CSS Variables** - 테마 색상 및 디자인 토큰 관리

### Code Quality
- **ESLint** - 코드 품질 검사
- **React Hooks ESLint Plugin** - React Hooks 규칙 검증

### Backend Integration
- **Fetch API** - REST API 통신
- **Vite Proxy** - 개발 환경에서 CORS 우회

---

##  시작하기

### 사전 요구사항

- **Node.js** 16.x 이상
- **npm** 8.x 이상


### **개발 서버 실행**
```bash
npm run dev
```

### 빌드

```bash

npm run build


npm run preview
```

---

## 프로젝트 구조

```
src/
├── api/                      
│   ├── client.js            
│   ├── auth.js              
│   ├── posts.js             
│   ├── comments.js          
│   └── upload.js            
│
├── components/               
│   ├── common/              
│   │   ├── Button.jsx       
│   │   ├── Input.jsx        
│   │   └── PostCard.jsx     
│   ├── features/            
│   │   ├── CommentItem.jsx  
│   │   └── ProfileImageUploader.jsx
│   └── layout/              
│       └── Header.jsx       
│
├── pages/                   
│   ├── LoginPage.jsx        
│   ├── SignupPage.jsx       
│   ├── PostListPage.jsx     
│   ├── PostDetailPage.jsx   
│   ├── PostEditPage.jsx     
│   ├── ProfileEditPage.jsx  
│   └── PasswordEditPage.jsx 
│
├── styles/                  
│   └── global.css           
│
├── utils/                   
│   └── validation.js        
│
├── App.jsx                  
└── main.jsx                 
```

---

## 주요 화면

### 로그인 & 회원가입
- 이메일/비밀번호 기반 인증
- 실시간 입력 검증 및 에러 메시지

### 게시글 목록
- 3열 그리드 레이아웃
- 카드 형식의 게시글 프리뷰 (제목, 내용, 이미지, 통계)
- 좋아요, 댓글 수, 조회수 표시

### 게시글 상세
- 전체 내용 및 이미지 표시
- 좋아요 토글 버튼 (💚 ↔ ❤️)
- 댓글 작성 및 목록
- 작성자 본인만 수정/삭제 가능

### 프로필 관리
- 프로필 이미지 업로드/삭제
- 닉네임 변경 (실시간 유효성 검사)
- 회원 탈퇴 기능

---


### API 엔드포인트

#### 인증
- `POST /members/sign-in` - 로그인
- `POST /members/sign-up` - 회원가입
- `GET /members/me` - 내 정보 조회
- `PATCH /members/me` - 프로필 수정
- `PATCH /members/password` - 비밀번호 변경
- `DELETE /members/me` - 회원 탈퇴

#### 게시글
- `GET /posts` - 게시글 목록 조회
- `GET /posts/:id` - 게시글 상세 조회
- `POST /posts` - 게시글 작성
- `PATCH /posts/:id` - 게시글 수정
- `DELETE /posts/:id` - 게시글 삭제
- `POST /posts/:id/like` - 좋아요 토글

#### 댓글
- `GET /posts/:id/comments` - 댓글 목록 조회
- `POST /comments` - 댓글 작성
- `DELETE /comments/:id` - 댓글 삭제

#### 파일 업로드
- `POST /upload` - 이미지 업로드



---