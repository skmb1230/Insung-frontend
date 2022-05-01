/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import "../../css/Common.css";
import "../../css/LoginPage.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function LoginPage(props) {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPw, setInputPw] = useState("");

  // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
  const handleInputId = (e) => {
    setInputEmail(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  // 이메일 유효성 검사
  const checkEmail = () => {
    const regExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    // 형식에 맞는 경우 true 리턴
    return regExp.test(inputEmail);
  };

  function joinHandler() {
    if (inputEmail.length === 0) {
      alert("이메일을 입력해 주세요.");
      return;
    }
    if (!checkEmail()) {
      alert("이메일을 형식을 맞춰주세요.");
      return;
    }
    if (inputPw.length === 0) {
      alert("비밀번호를 입력해 주세요.");
      return;
    }

    try {
      const data = { userEmail: inputEmail, password: inputPw };
      axios
        .post("/authenticate", JSON.stringify(data), {
          headers: {
            "Content-Type": `application/json`,
          },
        })
        .then((res) => {
          console.log(res.data);
          // 로컬 스토리지에 저장해둔다.
          // 선택사항 추가 후 세션스토리지에 저장.
          // 쿠키 단점 서버로부터 리소스를 받음.
          sessionStorage.setItem("token", res.data.token);
          sessionStorage.setItem("authenticatedUser", inputEmail);
          axios.defaults.headers.common.Authorization = `Bearer ${res.data}`;
          props.loginCallBack(true);
          props.history.push("/");
        })
        .catch((ex) => {
          console.log(`login requset fail : ${ex}`);
        })
        .finally(() => {
          console.log("login request end");
        });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    console.log("LoginPage render ... ");
    // 토큰이 만료될경우 토큰값에따라 랜더링 조정..
  }, []);

  return (
    <div>
      <div className="container">
        <div className="login_wrap">
          <div id="login-logo-area" className="logo">
            로 그 인
          </div>
          <div id="login-area">
            <div className="login-input-area">
              <input
                id="userEmail"
                className="login-input"
                name="userEmail"
                placeholder="아이디"
                onChange={handleInputId}
              />
            </div>
            <div className="login-input-area">
              <input
                id="password"
                className="login-input"
                name="password"
                type="password"
                placeholder="비밀번호"
                onChange={handleInputPw}
              />
            </div>
            <button
              type="button"
              className="login-button"
              onClick={joinHandler}
            >
              로그인
            </button>
          </div>
          <div className="account-area">
            <input
              type="checkbox"
              name="rememberid"
              id="rememberid"
              value="1"
            />
            <label id="rememberid-label" htmlFor="rememberid">
              아이디 저장
            </label>
            <a href="#1" id="pw_search" className="account-pwSearch">
              비밀번호 찾기
            </a>
            <Link to="/emailAuth" id="signup" className="account-signup">
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
