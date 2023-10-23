import React from 'react';
import styled from 'styled-components';

const SlideCard = styled.div`
  background-image: url(${props => props.$backgroundImage});
  background-size: cover;
  background-position: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  margin-right: 10px;
  margin-left: 10px;
  height: 300px;
`;


const SlideTitle = styled.h3`
  font-size: 22pt;
  font-weight: bold;
  margin-top: 65px;
  color: #e5e6e6;
`;

const SlideRank = styled.div`
  font-size: 20pt;
  font-family: 'Black Han Sans', sans-serif;
  color: white;
  margin-bottom: 5px;
`;

const SlideDescription = styled.p`
  font-size: 13pt;
  font-weight: bold;
  color: white;
`;

const SlideLocation = styled.p`
  font-size: 22pt;
  font-family: 'Black Han Sans', sans-serif;
  color: white;
`;

function SlideContent({ title, image, rank, description, location }) {
    return (
      <SlideCard $backgroundImage={image}>
        <SlideRank>Rank {rank}</SlideRank>
        <SlideTitle>{title}</SlideTitle>
        <SlideDescription>{description}</SlideDescription>
        <SlideLocation>{location}</SlideLocation>
      </SlideCard>
    );
}

export default SlideContent;
