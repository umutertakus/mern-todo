import { ChangeEvent, FC, useState } from "react";
import { useToast } from "../hooks/useToast";
import styled from "styled-components";
import LoadingButton from "./LoadingButton";
import { ILoginUserInfo } from "../types/interfaces";
import { ToastContainer } from "react-toastify";
import { api } from "../utils/api";

const AuthCard = styled.div`
  height: 320px;
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

const CheckAccount = styled.span`
  padding-top: 4px;
  font-size: 12px;
  cursor: pointer;
  color: #5f5fa2;
  text-decoration: underline;
`;

interface Props {
  setIsLoginPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: FC<Props> = ({ setIsLoginPage }) => {
  const { showToast } = useToast();
  const [userInfo, setUserInfo] = useState<ILoginUserInfo>({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setUserInfo((prev: ILoginUserInfo) => ({
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
        await api.post("/auth/login", userInfo);
        showToast("Login successful.", "success");
      } catch (err: any) {
        showToast(err.response.data.message, "error");
      }
      setIsLoading(false);
    } else {
      showToast("All fields must be filled.", "error");
    }
  };

  const switchPageType = (): void => {
    setIsLoginPage((prev) => !prev);
  };

  return (
    <AuthCard>
      <Title>Login to your account</Title>
      <FormContainer>
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
          Login
        </LoadingButton>
        <div>
          <CheckAccount onClick={switchPageType}>
            Don't you have an account?
          </CheckAccount>
        </div>
      </FormContainer>
      <ToastContainer />
    </AuthCard>
  );
};

export default Login;
