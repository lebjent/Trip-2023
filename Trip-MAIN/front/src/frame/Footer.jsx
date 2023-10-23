import React from 'react';
import styled from 'styled-components';
import youtube from '../image/icon/youtube.png';
import instagram from '../image/icon/instagram.png';
import kakaotalk from '../image/icon/kakaotalk.png';

const FooterWrapper = styled.footer`
  background-color: #444; /* 새로운 배경 색상을 여기에 설정 */
  color: white;
  padding: 30px 0;
  text-align: center;
`;

const FooterText = styled.p`
  font-size: 16px;
  margin: 0;
`;

const ContactInfo = styled.div`
  margin-top: 20px;
`;

const ContactItem = styled.div`
  margin: 10px 0;
  font-size: 14px;
`;

const SocialLinks = styled.div`
  margin-top: 20px;
`;

const SocialLink = styled.a`
  color: white;
  text-decoration: none;
  margin: 0 10px;
  font-size: 20px;
  transition: color 0.3s;

  &:hover {
    color: #ffc107; /* 노란색 계열로 변경 */
  }
`;

function Footer() {
  return (
    <FooterWrapper>
      <FooterText>© 2023 Wedding Bliss Tour. All Rights Reserved.</FooterText>
      <ContactInfo>
        <ContactItem>123 Main Street, City, Country</ContactItem>
        <ContactItem>Phone: +1 (123) 456-7890</ContactItem>
        <ContactItem>Email: info@weddingblisstour.com</ContactItem>
      </ContactInfo>
      <SocialLinks>
        <SocialLink href="#">
            <img  src={instagram} alt="instagram" width="40"height="40" />
        </SocialLink>
        <SocialLink href="#">
            <img  src={youtube} alt="youtube" width="40"height="40" />
        </SocialLink>
        <SocialLink href="#">
            <img src={kakaotalk} alt="kakaotalk" width="40"height="40" />
        </SocialLink>
        <SocialLink href="#">
          <i className="fab fa-pinterest"></i>
        </SocialLink>
      </SocialLinks>
    </FooterWrapper>
  );
}

export default Footer;