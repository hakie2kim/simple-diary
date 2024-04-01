// import logo from './logo.svg';
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import React, { useMemo, useEffect, useState, useRef } from "react";
// import OptimizeTest from "./OptimizeTest";
// import LifeCycle from "./LifeCycle";

// const dummyList = [
//   {
//     id: 1,
//     author: "김학준",
//     content: "어쩌구1",
//     emotion: 1,
//     created_time: new Date().getTime(),
//   },
//   {
//     id: 2,
//     author: "김학준",
//     content: "어쩌구2",
//     emotion: 2,
//     created_time: new Date().getTime(),
//   },
//   {
//     id: 3,
//     author: "김학준",
//     content: "어쩌구3",
//     emotion: 5,
//     created_time: new Date().getTime(),
//   },
// ];

export const DiaryStateContext = React.createContext();

function App() {
  const [data, setData] = useState([]); // 일기가 없는 상태로 출발

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => {
      return res.json();
    });
    // console.log(res);

    // 20개의 데이터만 씀
    const initData = res.slice(0, 20).map((item) => {
      return {
        author: item.email,
        content: item.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_time: new Date().getTime(),
        id: dataId.current++,
      };
    });

    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

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

  const onDelete = (targetId) => {
    // console.log(targetId);
    const newDiaryList = data.filter((item) => {
      return item.id !== targetId;
    });
    setData(newDiaryList);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((item) =>
        item.id === targetId ? { ...item, content: newContent } : item
      )
    );
  };

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((item) => item.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;

    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  const provider = { data, onCreate };

  return (
    <div className="App">
      {/* <OptimizeTest /> */}
      {/* <LifeCycle /> */}
      <DiaryStateContext.Provider value={provider}>
        {/* <DiaryEditor onCreate={onCreate} /> */}
        <DiaryEditor />
        <div>전체 일기: {data.length}</div>
        <div>기분 좋은 일기 개수: {goodCount}</div>
        <div>기분 나쁜 일기 개수: {badCount}</div>
        <div>기분 좋은 일기 비율: {goodRatio}</div>
        {/* <DiaryList onEdit={onEdit} onDelete={onDelete} diaryList={data} /> */}
        <DiaryList onEdit={onEdit} onDelete={onDelete} />
      </DiaryStateContext.Provider>
    </div>
  );
}

export default App;
