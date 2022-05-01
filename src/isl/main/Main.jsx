/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import React, { useState } from "react";

function MainPage() {
  const [count, setCount] = useState(0);

  // function onIncrease() {
  //     setCount(count+1);
  // }
  // function onDecrease() {
  //     setCount(count-1);
  // }
  // 메인페이지 안에 자식 컴포넌트
  // 메인에서 갱신하면 자식도 갱신이 되야된다.
  return (
    <div>
      <span>로그인 성공</span>
      <br />
      <h1>{count}</h1>
    </div>
  );
}

export default MainPage;
