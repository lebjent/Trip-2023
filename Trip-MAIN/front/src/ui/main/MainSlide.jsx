import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SlideContent from "./SlideContent"; // SlideContent 컴포넌트 임포트
import Swiss from "../../image/main/swiss.jpg";
import Maldive from "../../image/main/Maldive.jpg";
import Bali from "../../image/main/bali.jpg";
import Dubai from "../../image/main/dubai.jpg";
import Hawai from "../../image/main/hawai.jpg";
import LasVegas from "../../image/main/LasVegas.jpg";

const SlideDiv = styled.div`
margin-top: 50px;
margin-bottom: 50px;
padding-top: 25px;
padding-bottom: 25px;
`;

const StyledText = styled.p`
font-family: 'Gamja Flower', cursive;
font-size: 30pt;
font-weight: bold;
text-align: center;
color: black;
`;

function MainSlide() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3, // 원하는 개수로 변경
    slidesToScroll: 1, // 원하는 개수로 변경
    autoplay: true,
    autoplaySpeed: 3000
  };


  const slideData = [
    {
      title: "동유럽 6N/8D 자유여행",
      image: Swiss,
      rank: 1,
      description: "#스위스,#스페인,#오스트리아,#체코,#독일",
      location: "Europe"
    },
    {
      title: "몰디브 6N/8D 자유여행",
      image: Maldive,
      rank: 2,
      description: "#몰디브,#자유여행,#힐링,#휴양지",
      location: "Maldive"
    },
    {
      title: "발리 6N/7D",
      image: Bali,
      rank: 3,
      description: "#발리,#동남아,#인도네시아,#허니문",
      location: "Bali"
    },
    {
      title: "특별한 경험 두바이 6N/7D",
      image: Dubai,
      rank: 4,
      description: "#특별함,#추억,#야경,#분수쇼",
      location: "Dubai"
    },
    {
      title: "명실상부 1등 하와이 6N/7D",
      image: Hawai,
      rank: 5,
      description: "#쇼핑,#휴양지,#힐링,#자유여행,#알로와",
      location: "Hawaii"
    },
    {
      title: "라스베이거스 & LA 7N/8D",
      image: LasVegas,
      rank: 6,
      description: "#쇼핑,#휴양지,#힐링,#자유여행,#미국",
      location: "LasVegas"
    }
  ];

  return (
    <SlideDiv>
      <StyledText>가장 사랑받는 월간 Best 허니문 여행지!</StyledText>
      <Slider {...settings}>
        {slideData.map((slide, index) => (
          <div key={index}>
            {/* SlideContent 컴포넌트를 사용하여 슬라이드 컨텐츠 렌더링 */}
            <SlideContent
              title={slide.title}
              image={slide.image}
              rank={slide.rank}
              description={slide.description}
              location={slide.location}
            />
          </div>
        ))}
      </Slider>
    </SlideDiv>
  );
}

export default MainSlide;
