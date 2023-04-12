import { useAutoAnimate } from "@formkit/auto-animate/react";
import styled from "styled-components";
import authBg from "../assets/authbg.jpg";
import Register from "./Register";
import { useState } from "react";
import Login from "./Login";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url(${authBg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
`;

const Auth = () => {
  const [animationParent] = useAutoAnimate();

  const [isLoginPage, setIsLoginPage] = useState<boolean>(false);
  return (
    <Container ref={animationParent}>
      {isLoginPage ? (
        <Login setIsLoginPage={setIsLoginPage} />
      ) : (
        <Register setIsLoginPage={setIsLoginPage} />
      )}
    </Container>
  );
};

export default Auth;
