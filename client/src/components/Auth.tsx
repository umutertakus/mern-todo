import styled from "styled-components";
import authBg from "../assets/authbg.jpg";
import Register from "./Register";

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
  return (
    <Container>
      <Register />
    </Container>
  );
};

export default Auth;
