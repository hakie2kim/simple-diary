# 감정 일기장

## 📓 소개

- 일기를 작성하는 서비스
- 감정까지 함께 기록 가능

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
