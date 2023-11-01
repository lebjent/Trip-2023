import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import styled from '@emotion/styled';
import LoginPage from './ui/main/LoginPage';
import EmployeeJoin from './ui/employee/EmployeeJoin';
import DashBoard from './ui/main/index/DashBoard';

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

  const loginInfo = JSON.parse(sessionStorage.getItem('loginInfo'));


  return (
    <BrowserRouter>
      <AppWrapper>
        <Content>
          <Routes>
            <Route
              path="/"
              element={loginInfo ? <Navigate to="/dashboard" /> : <LoginPage />}
            />
            <Route path="/employeeJoin" element={loginInfo ? <Navigate to="/dashboard" /> : <EmployeeJoin />} />
            {/* /dashboard 라우트 설정 */}
            <Route path="/dashboard/*" element={
              loginInfo ? (
                <DashBoard />
              ) : (
                <Navigate to="/" state={{ from: '/dashboard' }} />
              )
            } />
          </Routes>
        </Content>
      </AppWrapper>
    </BrowserRouter>
  );
}

export default App;
