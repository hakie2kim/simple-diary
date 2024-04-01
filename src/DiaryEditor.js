import React, { useContext, useState, useRef } from "react";
import { DiaryStateContext } from "./App";

const DiaryEditor = () => {
  const [state, setState] = useState({
    author: "작가",
    content: "본문",
    emotion: 1,
  });
  //   const [author, setAuthor] = useState("작가");
  //   const [content, setContent] = useState("본문");

  const { onCreate } = useContext(DiaryStateContext);

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const authorInput = useRef();
  const contentInput = useRef();

  const handleSubmit = (e) => {
    // console.log(state);
    if (state.author.length < 1) {
      authorInput.current.focus();
      return;
    }

    if (state.content.length < 5) {
      contentInput.current.focus();
      return;
    }

    onCreate(state.author, state.content, state.emotion);
    alert("저장 성공");

    setState({
      author: "",
      content: "",
      emotion: 1,
    });
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기장</h2>
      <div>
        <input
          ref={authorInput}
          name="author"
          value={state.author}
          onChange={(e) => {
            setState({
              ...state,
              author: e.target.value,
              //   content: state.content,
            });
          }}
        />
      </div>
      <div>
        <textarea
          ref={contentInput}
          name="content"
          value={state.content}
          //   onChange={(e) => {
          //     setState({
          //       //   author: state.author,
          //       ...state,
          //       content: e.target.value,
          //     });
          //   }}

          onChange={handleChangeState}
        />
      </div>
      <div>
        <span>오늘의 감정 점수 : </span>
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
};

export default DiaryEditor;