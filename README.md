# 감정 일기장

## 📓 소개

- 일기를 작성하는 서비스
- 감정까지 함께 기록 가능

## 🔨 과정

1. 기본 세팅

- 폰트, 레이아웃, 이미지 asset 세팅
- 공통 컴포넌트 세팅 예) 버튼, 헤더

2. 구조

   ![alt text](image-1.png)

3. 각 페이지 구현

## 🔍 구현 설명

- 입력값 받기

  ```javascript
  const [state, setState] = useState({
    author: "작가",
    content: "본문",
    emotion: 1,
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  <textarea
    ref={contentInput}
    name="content"
    value={state.content}
    onChange={handleChangeState}
  />;
  ```

  - 각각의 입력값을 받는 태그의 속성 onChange 값으로 handleChangeState로 지정
  - `handleChange`는 `state`를 지정

- 일기 통계

  ```javascript
  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((item) => item.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;

    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;
  ```

  - `useMemo()`: memoization을 통한 연산 과정 최적화
    - 첫번째 인자: 콜백함수의 리턴 값은 getDiaryAnalysis로 저장됨
    - 두번째 인자: 배열의 값, data.length의 값이 바뀌면 콜백함수를 다시 실행

- 일기 내용은 5자 이상

  ```javascript
  const localContentInput = useRef();

  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }

    <textarea
      ref={localContentInput}
      value={localContent}
      onChange={(e) => setLocalContent(e.target.value)}
    />;
  };
  ```

  - `useRef()`: DOM에서 어떤 요소를 선택하고 있는지 알게 함
  - `focus()`를 통해 조건을 만족하지 않을 경우 참조하는 요소로 커서를 이동

- `Context API`를 통한 데이터 전역 공급

  - `Context` 생성

    ```javascript
    export const DiaryStateContext = React.createContext();
    ```

  - `Context Provider`를 통한 데이터 공급

    ![alt text](image-2.png)

    ```javascript
    const onCreate = (author, content, emotion) => {
      const created_time = new Date().getTime();
      const newItem = {
        id: dataId.current,
        author,
        content,
        emotion,
        created_time,
      };

      dataId.current += 1;
      setData([newItem, ...data]);
    };

    const provider = { data, onCreate };

    <DiaryStateContext.Provider value={provider}>
      <DiaryEditor />
      <div>전체 일기: {data.length}</div>
      <div>기분 좋은 일기 개수: {goodCount}</div>
      <div>기분 나쁜 일기 개수: {badCount}</div>
      <div>기분 좋은 일기 비율: {goodRatio}</div>
      <DiaryList onEdit={onEdit} onDelete={onDelete} />
    </DiaryStateContext.Provider>;
    ```

- 리스트 렌더링

  ```javascript
  const { data: diaryList } = useContext(DiaryStateContext);

  diaryList.map((item) => {
    return (
      <DiaryItem key={item.id} {...item} onEdit={onEdit} onDelete={onDelete} />
    );
  });
  ```

  - map을 통해 각 리스트의 값을 `DiaryItem` 컴포넌트로 전달

## 🎯 개선할 점

- session의 key-value 값을 이용하고 있음

  ⇨ 데이터를 저장, 분석 등을 목적으로 데이터베이스와의 연결 필요

- React hook을 이용한 최적화

## ⚛️ React 토막 정리
