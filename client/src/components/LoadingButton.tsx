import { MouseEvent, ReactNode } from "react";
import styled from "styled-components";
import CircularProgress from "../components/CircularProgress";

interface ButtonProps {
  isDisabled?: boolean;
}

const Button = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
  border: none;
  border-radius: 16px;
  background-color: #4051e9;
  color: white;
  height: 48px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
  &:active {
    background-color: ${(props) => (props.isDisabled ? "#4051e9" : "#6871c3")};
    opacity: 0.8;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }
`;

interface Props {
  children?: ReactNode;
  isLoading?: boolean;
  name?: string;
  onClick?: () => void;
}

const LoadingButton = ({ children, isLoading, name, onClick }: Props) => {
  return (
    <Button
      name={name}
      disabled={isLoading}
      onClick={onClick}
      isDisabled={isLoading}
    >
      {isLoading ? <CircularProgress /> : ""} {children}
    </Button>
  );
};

export default LoadingButton;
