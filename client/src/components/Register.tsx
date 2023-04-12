import styled from "styled-components";
import LoadingButton from "./LoadingButton";

const AuthCard = styled.div`
  height: 400px;
  width: 400px;
  background-color: aliceblue;
  border-radius: 16px;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  padding: 12px;
  text-align: center;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 20px;
  gap: 5px;
`;

const Label = styled.label`
  font-size: 14px;
  padding-top: 12px;
`;

const Input = styled.input`
  height: 40px;
  border-radius: 16px;
  outline: none;
  border: 1px solid lightgray;
  padding: 0px 15px;
  font-size: 16px;
  &:focus {
    outline: 1px double blueviolet;
    box-shadow: 5px 5px 10px rgba(186, 191, 222, 0.2);
  }
`;

const Register = () => {
  return (
    <AuthCard>
      <Title>Create an account</Title>
      <FormContainer>
        <Label htmlFor="fullName">Full Name</Label>
        <Input />
        <Label htmlFor="username">Username</Label>
        <Input />
        <Label htmlFor="password">Password</Label>
        <Input type="password" />
        <LoadingButton>Register</LoadingButton>
      </FormContainer>
    </AuthCard>
  );
};

export default Register;
