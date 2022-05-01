/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-alert */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from "react";
import "../../css/Common.css";
import "../../css/LoginPage.css";

function SignUp(props) {
  const [count, setCount] = useState(0);
  const [inputEmail, setInputEmail] = useState("");

  useEffect(() => {
    // 가져온 데이터를 바로 setCount 준다.
    setCount(() => props.location.state.count.count);
  }, []);

  const onIncrease = () => {
    setCount((prevCount) => prevCount + 1);
  };
  const onDecrease = () => {
    setCount((prevCount) => prevCount - 1);
  };

  // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
  const handleInputEmail = (e) => {
    setInputEmail(e.target.value);
  };

  function signUpHandler() {
    alert(inputEmail);
    console.log(props);
  }

  // 메인페이지 안에 자식 컴포넌트
  // 메인에서 갱신하면 자식도 갱신이 되야된다.
  return (
    <div>
      <div className="container">
        <div className="login_wrap">
          <div id="login-logo-area" className="logo">
            회원가입
          </div>
          <div id="login-area">
            <div className="login-input-area">
              <input
                id="userEmail"
                className="login-input"
                name="userEmail"
                placeholder="이메일"
                onChange={handleInputEmail}
              />
            </div>
            <button
              type="button"
              className="login-button"
              onClick={signUpHandler}
            >
              가입신청
            </button>
            <h1>{count}</h1>
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
