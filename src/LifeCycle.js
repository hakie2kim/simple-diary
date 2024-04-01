import { useState, useEffect } from "react";

// const LifeCycle = () => {
//   const [count, setCount] = useState(0);
//   const [text, setText] = useState("");

//   useEffect(() => {
//     console.log("Mount!");
//   }, []); // 해당 컴포가 마운트되는 시점에 (업데이트 x)

//   useEffect(() => {
//     console.log(`count is updatating: ${count}`);
//     console.log("Update!");
//   }); // 해당 컴포가 업데이트되는 시점에

//   useEffect(() => {
//     console.log(`count is updatating: ${count}`);
//     if (count > 5) {
//       alert(`count가 5를 넘어가서 다시 1로 초기화합니다`);
//       setCount(0);
//     }
//   }, [count]); // 해당 컴포의 count가 5를 넘어가는 시점에

//   useEffect(() => {
//     console.log(`text is updatating: ${text}`);
//   }, [text]); // 해당 컴포의 text state 업데이트

//   return (
//     <div style={{ padding: 20 }}>
//       <div>
//         {count}
//         <button onClick={() => setCount(count + 1)}>+</button>
//       </div>
//       <div>
//         <input value={text} onChange={(e) => setText(e.target.value)} />
//       </div>
//     </div>
//   );
// };

const UnmountTest = () => {
  useEffect(() => {
    console.log("Mount!");
    return () => {
      console.log("Unmount!");
    };
  }, []);
};

const LifeCycle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div style={{ padding: 20 }}>
      <div>
        <button onClick={toggle}>ON/OFF</button>
        {isVisible && <UnmountTest />}
      </div>
    </div>
  );
};

export default LifeCycle;
