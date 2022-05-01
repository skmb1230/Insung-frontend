/* eslint-disable react/jsx-no-bind */
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import AuthRoute from "./components/AuthRoute";
import LoginPage from "./isl/login/Login";
import MainPage from "./isl/main/Main";
import EmailAuth from "./isl/login/EmailAuth";
import SignUpPage from "./isl/login/SignUp";

// 1. 최상위에서만 Hook을 호출해야 합니다. 반복문, 조건믄 ,중첩된 함수 내에서 Hook을 실행하면 안된다.
// 2. React 함수 컴포넌트 내에서만 Hook을 호출해야 합니다. 일반 Javascript에서는 Hook을 호출하면 안된다
// 3. custom Hook 내에서는 호출 가능하다.
// 1. useState (Hook) 호출

function App() {
  // 2. useState를 이용하여 isLogin(state) 추가 , 초기값 false =? 이 state 는
  // 다시 렌더링 되어도 그대로 유지
  // 이거와 같은 기능을 클래스로 만들기
  const [isLogin, setIsLogin] = useState(false);
  // const [loading, setLoading] = useState(true);

  // 클래스형 componentDidMount, componentDidUpdate와 비슷하다.
  // useEffect를 사용하면, React는 DOM을 바꾼 뒤에 “effect” 함수를 실행할 것입니다.
  // Effects는 컴포넌트 안에 선언되어있기 때문에 props와 state에 접근할 수 있습니다.
  // React는 매 렌더링 이후에 effects를 실행합니다 (첫 번째 렌더링도 포함)
  useEffect(() => {
    // 로그인유지 ??
    const token = sessionStorage.getItem("token");
    if (token != null && token !== "") {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      setIsLogin(true);
    }
  });

  function loginCallBack(login) {
    setIsLogin(login);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <AuthRoute exact isLogin={isLogin} path="/" component={MainPage} />
        <Route
          path="/login"
          render={(props) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <LoginPage {...props} loginCallBack={loginCallBack} />
          )}
        />
        <Route
          path="/emailAuth"
          render={(props) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <EmailAuth {...props} />
          )}
        />
        <Route
          path="/signUp"
          render={(props) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <SignUpPage {...props} />
          )}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
