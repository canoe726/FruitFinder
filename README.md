# FruitFinder
FruitFinder - 검색, 무한 스크롤, 모달창 기능을 가진 과일 검색 페이지

### 1. FruitFinder 프로젝트
> 검색, 무한 스크롤, 모달창 기능을 가진 과일 검색 페이지 제작 프로젝트

### 2. 개요
> 사용언어 : HTML, CSS, JavaScript(Vanilla)
> API : Web Storage API 를 사용하여 화면 스킨, 입력한 검색어 저장
* Web Storage API 를 지원하지 않는 브라우저 사용 시 동작하지 않음

### 3. 사용법
> 실행 : 모든 파일을 로컬에 저장 -> 웹 브라우저를 통한 실행
> 환경 : 구글 크롬에서 사용 권장 (반응형 UI)

### 4. 구현 된 화면
<div>
  <img width="45%" src="https://user-images.githubusercontent.com/36183001/89730729-76135600-da7c-11ea-961c-08972cd78678.gif">
  &nbsp;&nbsp;&nbsp;
  <img width="45%" src="https://user-images.githubusercontent.com/36183001/89730828-3c8f1a80-da7d-11ea-9445-855b53ad6cf9.gif">
</div>

> 왼쪽부터 스킨 변경, 모달창 이벤트

<div>
  <img width="45%" src="https://user-images.githubusercontent.com/36183001/89730867-9d1e5780-da7d-11ea-9084-f67f9beef0bc.gif">
  &nbsp;&nbsp;&nbsp;
  <img width="45%" src="https://user-images.githubusercontent.com/36183001/89730698-13ba5580-da7c-11ea-9686-df75a3a99ea3.gif">
</div>

> apple 검색한 결과, 검색한 결과가 존재하지 않음 (404 Not Found)

<div>
  <img width="45%" src="https://user-images.githubusercontent.com/36183001/89730934-29307f00-da7e-11ea-9d6d-435b29d3d00e.gif">
  &nbsp;&nbsp;&nbsp;
  <img width="45%" src="https://user-images.githubusercontent.com/36183001/89730997-98a66e80-da7e-11ea-9c05-f897c58c16e2.gif">
</div>

> 검색한 키워드 모두 제거 (단일 제거도 가능), 무한 스크롤 (Lazy Loading)

<div>
  <img width="45%" src="https://user-images.githubusercontent.com/36183001/89731095-592c5200-da7f-11ea-9f79-52abbb9a28c4.gif">
</div>

> 모바일 화면

### 5. 예외 처리
1. 검색어 입력이 없을 시 alert 창 띄움
2. 더이상 이미지를 로드할 수 없을 때 '더 이상 이미지가 없습니다' 텍스트 생성

