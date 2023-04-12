import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingButton from "./LoadingButton";
import { ChangeEvent, useEffect, useState } from "react";
import { IUserInfo } from "../types/interfaces";
import { api } from "../utils/api";
import { useToast } from "../hooks/useToast";

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
  const { showToast } = useToast();
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    fullName: "",
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setUserInfo((prev: IUserInfo) => ({
      ...prev,
      [name]: value,
    }));
  };

  const allValuesExist = (obj: { [key: string]: any }): boolean => {
    for (const key in obj) {
      if (obj[key] === "") {
        return false;
      }
    }
    return true;
  };

  const handleClick = async (): Promise<void> => {
    if (allValuesExist(userInfo)) {
      setIsLoading(true);
      try {
        const response = await api.post("/auth/register", userInfo);
        showToast(response.data.message, "success");
      } catch (err: any) {
        showToast(err.response.data.message, "error");
      }
      setIsLoading(false);
    } else {
      showToast("All fields must be filled.", "error");
    }
  };

  return (
    <AuthCard>
      <Title>Create an account</Title>
      <FormContainer>
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          name="fullName"
          value={userInfo.fullName}
          onChange={handleChange}
        />
        <Label htmlFor="username">Username</Label>
        <Input
          name="username"
          value={userInfo.username}
          onChange={handleChange}
        />
        <Label htmlFor="password">Password</Label>
        <Input
          name="password"
          type="password"
          value={userInfo.password}
          onChange={handleChange}
        />
        <LoadingButton onClick={handleClick} isLoading={isLoading}>
          Register
        </LoadingButton>
      </FormContainer>
      <ToastContainer />
    </AuthCard>
  );
};

export default Register;
