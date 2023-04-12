import styled from "styled-components";

const Circle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  ::before {
    content: "";
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid white;
    border-top-color: blue;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    animation: progress-animation 0.7s linear infinite;

    @keyframes progress-animation {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
`;

const CircularProgress = () => {
  return <Circle />;
};

export default CircularProgress;
