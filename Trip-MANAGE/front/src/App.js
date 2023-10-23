import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from '@emotion/styled';
import LoginPage from './ui/main/LoginPage';
import EmployeeJoin from './ui/employee/EmployeeJoin';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

function App() {


  return (
    <BrowserRouter>
      <AppWrapper>
        <Content>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/employeeJoin" element={<EmployeeJoin />} />
          </Routes>
        </Content>
      </AppWrapper>
    </BrowserRouter>
  );
}

export default App;
