import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './frame/Header';
import Footer from './frame/Footer';
import styled from 'styled-components';
import Home from './ui/main/Home';
import Review from './ui/review/menu/Review';

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
        <Header />
        <Content>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/review/*" element={<Review />} />
          </Routes>
        </Content>
        <Footer />
      </AppWrapper>
    </BrowserRouter>
  );
}

export default App;
