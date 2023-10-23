import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Button, Dropdown, Form, Grid, Input, Message, Rating, Select, TextArea } from 'semantic-ui-react'
import CustomModal from '../../modal/CustomModal';

/* 스타일 컴포넌트 라인 */

const ReviewForm = styled.div`
  max-width: 800px;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const SectionHeader = styled.h2`
  font-size: 24pt;
  font-weight: bold;
  font-family: 'Gamja Flower', cursive;
  color: #333;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const SectionDiv = styled.div`
    margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size : 12pt;
  font-weight: bold;
  font-family: 'Gamja Flower', cursive;
`;

const ImagePreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  padding: 5px;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 200px;
  margin-right: 10px;
  margin-bottom: 10px;
  border: 1px solid #333;
`;


/* 여행후기 내용 글자수 */
const ContentLength = styled.p`
  text-align: right;
  font-weight: bold;
  font-family: 'Gamja Flower', cursive;
  color: ${(props) => (props.$isOverLimit ? 'red' : '#333')};
`;

/* 여행지역 selectbox 구분 추후 관리자 페이지로 통한 지역관리는 DB로 관리예정*/

const bigCategory = [
  { key: 'EU', value: 'EU', text: '유럽' },
  { key: 'EA', value: 'EA', text: '동남아' },
  { key: 'AM', value: 'AM', text: '미주' },
  { key: 'ETC', value: 'ETC', text: '기타' }
];

/* 동남아 소분류 데이터 */
const eaData = [
  { key: 'CXR', value: 'CXR', text: '나트랑' },
  { key: 'KLO', value: 'KLO', text: '보라카이' },
  { key: 'DPS', value: 'DPS', text: '발리' },
  { key: 'HKT', value: 'HKT', text: '푸켓' }
]

/* 유럽 소분류 데이터 */
const euData = [
  {key:'DE',value:'DE',text:'독일'},
  {key:'FR',value:'FR',text:'프랑스'},
  {key:'CH',value:'CH',text:'스위스'},
  {key:'SE',value:'SE',text:'스웨덴'},
  {key:'AT',value:'AT',text:'오스트리아'},
  {key:'CZ',value:'CZ',text:'체코'},
  {key:'FI',value:'FI',text:'핀란드'},
  {key:'HU',value:'HU',text:'헝가리'}
];

/* 미주 소분류 데이터 */

const amData = [
  {key:'GUM',value:'GUM',text:'괌'},
  {key:'LAX',value:'LAX',text:'로스엔젤레스'},
  {key:'SPN',value:'SPN',text:'사이판'},
  {key:'HNL',value:'HNL',text:'하와이'}
];

const etcData = [
  {key:'DXB',value:'DXB',text:'두바이'},
  {key:'MRU',value:'MRU',text:'모리셔스'},
  {key:'MLE',value:'MLE',text:'몰디브'}
]

function ReviewWrite() {
  const [smallCategory,setSmallCategory] = useState([]);
  const [travelArea,setTravelArea] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(1);
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [contentLength,setContentLength] = useState('0/500자');
  const [selectedValue,setSelectedValue] = useState([]);

  //모달 상태
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const [msg,setMsg] = useState("");
  
  /* 대분류 카테고리 옵션 선택시 */
  const handleBigOptionChange = (e,data) => {
    const bigData = data.value;
    setSelectedValue([]);
    if(bigData === 'EA'){
      setSmallCategory(eaData);
    }else if (bigData === 'EU'){
      setSmallCategory(euData);
    }else if(bigData === 'AM'){
      setSmallCategory(amData);
    }else if(bigData === 'ETC'){
      setSmallCategory(etcData);
    }
  } 

  /* 소분류 카테고리 옵션 선택시 */
  const handleSmallOptionChange = (e,data) => {
    if(data.value.length >= 4){
      setSelectedValue([]);
      setMsg("여행지역은 최대 3개 지역만 선택 할 수 있습니다.");
      setModalIsOpen(true);
      return false;
    }else{
      setSelectedValue(data.value);
      setTravelArea(data.value);
    }
  }

  /* 여행리뷰 내용 입력 및 글자수 체크 */
  const handleContentChange = (e) => {
    const length = e.target.value.length;
    setContent(e.target.value);
    setContentLength(length + '/500자');
  }

  /* 평점 선택시 */
  const handleRateChange = (e) =>{
    setRating(e.currentTarget.getAttribute('aria-posinset'));
  }

  /* 여행리뷰 사진 선택시 */
  const handleImageChange = (e) => {
    const fileList = e.target.files;
    const images = [];
    const imageFileContent = [];
    
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (file && file.type.startsWith('image/')) {
        images.push(URL.createObjectURL(file));
        imageFileContent.push(file);
      }
    }
    setImageFiles(imageFileContent);
    setImages(images);
  };

  /* 여행리뷰 작성버튼 클릭시 */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log(travelArea.length);

    if(travelArea.length <= 0){
      setMsg("여행지역을 선택해주세요.");
      setModalIsOpen(true);
      return false;
    }

    if (title === '') {
      setMsg("허니문 후기 제목을 입력해주세요.");
      setModalIsOpen(true);
      return false;
    }

    if (content === '') {
      setMsg("허니문 후기 내용을 입력해주세요.");
      setModalIsOpen(true);
      return false;
    }

    if(content.length > 500){
      setMsg("허니문 후기 내용을 500자 이내로 작성 해주세요.");
      setModalIsOpen(true);
      return false;
    }


    if(rating === 0){
      setMsg("평점을 입력해주세요.");
      setModalIsOpen(true);
      return false;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('rating', rating);
    formData.append('writer','금잔디');
    formData.append('travelArea',travelArea.join(','));
    

    // 파일 업로드 시 이미지 파일을 추가
    for (let i = 0; i < imageFiles.length; i++) {
      formData.append('images', imageFiles[i]);
    }

    axios.post('/trip/reviewWrite', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // 멀티파트 요청 설정
      },
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <ReviewForm>
      <SectionHeader>Wedding Bliss Tour 허니문 여행후기</SectionHeader>
      <Form onSubmit={handleSubmit} encType='multipart/form-data'>
        <SectionDiv>
          <Label>여행지역</Label>
          <Grid columns='equal'>
            <Grid.Column width={4}>
              <Select placeholder='대분류' options={bigCategory} onChange={handleBigOptionChange} />
            </Grid.Column>
            <Grid.Column width={12}>
            <Dropdown
              placeholder='소분류'
              fluid
              multiple
              search
              selection
              options={smallCategory}
              onChange={handleSmallOptionChange}
              value={selectedValue}
            />
            </Grid.Column>
          </Grid>
        </SectionDiv>
        <SectionDiv>
          <Label>후기 제목</Label>
          <Input placeholder='여행후기 제목을 멋있게 작성해보세요~^^' 
                 type="text"
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
                 fluid
          />
        </SectionDiv>
        <SectionDiv>
          <Label>후기 내용</Label>
          <TextArea 
            placeholder='여행에서 있었던 다양한 추억들을 기록하고 작성해보세요.' 
            style={{ minHeight: 500, width: '100%',resize: 'none' }} 
            value={content}
            onChange={e=>handleContentChange(e)}
          />
          <ContentLength $isOverLimit={content.length > 500}>{contentLength}</ContentLength>
        </SectionDiv>
        <SectionDiv>
          <Label>평점</Label>
          <Rating icon='star' defaultRating={1} maxRating={5} onRate={handleRateChange} />
        </SectionDiv>
        <SectionDiv>
          <Label>여행 사진 첨부</Label>
          <Input type='file'  
                 accept="image/*"
                 multiple // 여러 이미지 선택을 지원하기 위해 추가
                 onChange={handleImageChange} // 이미지 선택 시 미리보기 업데이트
                 icon='picture'
                 iconPosition='left'
          />
        </SectionDiv>
        <ImagePreviewContainer>
          {images.map((imageUrl, index) => (
            <ImagePreview key={index} src={imageUrl} alt={`이미지 미리보기 ${index}`} />
          ))}
        </ImagePreviewContainer>
        <Button primary type="submit">후기 제출</Button>
      </Form>
      <Message
          icon="plane"
          header='Wedding Bliss Tour 허니문 여행 후기'
          content='소중한 단 한번의 허니문 후기를 작성해주셔서 감사합니다.'
      />
      {/* 모달 영역 */}
      <CustomModal isOpen={modalIsOpen} onClose={closeModal} msg={msg} />
    </ReviewForm>
  );
}

export default ReviewWrite;
