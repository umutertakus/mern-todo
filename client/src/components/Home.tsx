import { useState } from "react";
import styled from "styled-components";
import TaskList from "./TaskList";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  background: rgb(216, 216, 228);
  background: linear-gradient(
    90deg,
    rgba(216, 216, 228, 1) 0%,
    rgba(191, 191, 217, 1) 35%,
    rgba(188, 191, 218, 1) 62%,
    rgba(151, 181, 187, 1) 100%
  );
`;

const Title = styled.h1`
  padding-top: 8px;
  text-align: center;
  font-size: 26px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 600px;
`;

const Input = styled.input`
  height: 50px;
  border-radius: 8px;
  outline: none;
  border: 1px solid lightgray;
  padding: 0px 15px;
  margin-top: 8px;
  font-size: 24px;
  &:focus {
    outline: 1px solid whitesmoke;
    box-shadow: 5px 5px 10px rgba(186, 191, 222, 0.2);
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 16px;
  padding: 8px;
  border-radius: 8px;
`;

interface ITabProps {
  isActive: boolean;
}

const Tab = styled.div<ITabProps>`
  flex: 1;
  text-align: center;
  letter-spacing: 1px;
  font-size: 18px;
  cursor: pointer;
  outline: ${(props) => (props.isActive ? "2px solid #5b5b6c" : "none")};
  border-radius: 8px;
`;

const Home = () => {
  const currentFullName = localStorage.getItem("fullName");
  const [selectedTab, setSelectedTab] = useState<number>(1);

  const handleTabChange = (tabIndex: number): void => {
    setSelectedTab(tabIndex);
  };

  return (
    <Container>
      <Card>
        <Title>Welcome {currentFullName}!</Title>
        <TabContainer>
          <Tab
            onClick={() => handleTabChange(1)}
            isActive={selectedTab === 1 ? true : false}
          >
            All
          </Tab>
          <Tab
            onClick={() => handleTabChange(2)}
            isActive={selectedTab === 2 ? true : false}
          >
            Active
          </Tab>
          <Tab
            onClick={() => handleTabChange(3)}
            isActive={selectedTab === 3 ? true : false}
          >
            Completed
          </Tab>
        </TabContainer>
        <Input />
        <TaskList selectedTab={selectedTab} />
      </Card>
    </Container>
  );
};

export default Home;
