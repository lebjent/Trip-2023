import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  background-color: #333;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;

const Logo = styled.div`
  a {
    color: white;
    text-decoration: none;
    font-size: 24px;
  }
`;

const Nav = styled.nav`
  ul {
    list-style: none;
    padding: 0;
    display: flex;
  }
  
  li {
    margin-right: 20px;
    position: relative;
  }

  a {
    color: white;
    text-decoration: none;
    font-size: 18px;
    transition: color 0.3s; /* 글자색 변화에 트랜지션 적용 */
  }

  a:hover {
    color: #ffc107; /* 노란색 계열로 변경 */
  }

  /* 소메뉴 스타일 */
  ul.submenu {
    display: none;
    width: 150px;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #444;
    list-style: none;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
  }

  /* 호버 시 소메뉴 표시 */
  li:hover ul.submenu {
    display: block;
  }
`;

const Title = styled.p`
    font-family: 'Black Han Sans', sans-serif;
    font-size: 19pt;
`;

function Header() {
  return (
    <HeaderWrapper>
      <Logo>
        <Link to="/"><Title>Wedding Bliss Tour</Title></Link>
      </Logo>
      <Nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/destinations">자유여행</Link>
            <ul className="submenu">
              <li><Link to="/destinations/beach">유럽</Link></li>
              <li><Link to="/destinations/mountains">동남아</Link></li>
              <li><Link to="/destinations/mountains">하와이/사이판</Link></li>
              <li><Link to="/destinations/mountains">몰디브</Link></li>
              <li><Link to="/destinations/mountains">두바이</Link></li>
              {/* 다른 소메뉴 아이템들을 추가하세요 */}
            </ul>
          </li>
          <li>
            <Link to="/packages">패키지</Link>
            <ul className="submenu">
              <li><Link to="/packages/luxury">Luxury</Link></li>
              <li><Link to="/packages/honeymoon">Honeymoon</Link></li>
              {/* 다른 소메뉴 아이템들을 추가하세요 */}
            </ul>
          </li>
          <li><Link to="/promotion">프로모션</Link></li>
          <li><Link to="/review">여행리뷰</Link></li>
        </ul>
      </Nav>
    </HeaderWrapper>
  );
}

export default Header;