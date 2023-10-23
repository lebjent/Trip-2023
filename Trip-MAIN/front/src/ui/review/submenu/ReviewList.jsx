import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Button, Dropdown, Flag, Grid, Label, Pagination, Rating, Select, Table } from 'semantic-ui-react';
import styled from "styled-components";
import * as formatDate from '../../../js/common/formatDate';
import * as formatTravelArea from '../../../js/common/formatTravelArea';

/* styled 컴포넌트 사용 */
const MainDiv = styled.div`
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    width: 80%;
    text-align: right;
`;

const HeaderImgDiv = styled.div`
    width: 100%;
    height: 550px;
    background-image: url('/img/review/headerMain.jpg');
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    margin-bottom: 50px;
`;

const OpacityDiv = styled.div`
    padding-bottom: 20px;
`;

const Pmain = styled.p`
    color: white;
    font-weight: bold;
    font-size: 30pt;
    margin-bottom: 0px;
    font-family: 'Gamja Flower', cursive;
`;

const Psub = styled.p`
    color: #deff2d;
    font-weight: bold;
    font-size: 15pt;
    font-family: 'Gamja Flower', cursive;
`;

const Plabel = styled.p`
    font-weight: bold;
    text-align: center;
    font-size: 12pt;
`;

/* 정렬 옵션 */
const sortOption = [
    { key: 'RTH', value: 'RTH', text: '최근등록일순▼' },
    { key: 'RTL', value: 'RTL', text: '최근등록일순▲' },
    { key: 'RH', value: 'RH', text: '평점높은순▲' },
    { key: 'RL', value: 'RL', text: '평점낮은순▼' },
];

/* 여행지역 대분류 데이터 */
const bigCategory = [
    { key: 'EU', value: 'EU', text: '유럽' },
    { key: 'EA', value: 'EA', text: '동남아' },
    { key: 'AM', value: 'AM', text: '미주' },
    { key: 'ETC', value: 'ETC', text: '기타' }
];

/* 여행지역 소분류 데이터 */
const eaData = [
    { key: 'CXR', value: 'CXR', text: '나트랑' },
    { key: 'KLO', value: 'KLO', text: '보라카이' },
    { key: 'DPS', value: 'DPS', text: '발리' },
    { key: 'HKT', value: 'HKT', text: '푸켓' }
];

const euData = [
    { key: 'DE', value: 'DE', text: '독일' },
    { key: 'FR', value: 'FR', text: '프랑스' },
    { key: 'CH', value: 'CH', text: '스위스' },
    { key: 'SE', value: 'SE', text: '스웨덴' },
    { key: 'AT', value: 'AT', text: '오스트리아' },
    { key: 'CZ', value: 'CZ', text: '체코' },
    { key: 'FI', value: 'FI', text: '핀란드' },
    { key: 'HU', value: 'HU', text: '헝가리' }
];

const amData = [
    { key: 'GUM', value: 'GUM', text: '괌' },
    { key: 'LAX', value: 'LAX', text: '로스엔젤레스' },
    { key: 'SPN', value: 'SPN', text: '사이판' },
    { key: 'HNL', value: 'HNL', text: '하와이' }
];

const etcData = [
    { key: 'DXB', value: 'DXB', text: '두바이' },
    { key: 'MRU', value: 'MRU', text: '모리셔스' },
    { key: 'MLE', value: 'MLE', text: '몰디브' }
];

function ReviewList() {
    const [smallCategory, setSmallCategory] = useState([]);
    const [travelArea, setTravelArea] = useState([]);
    const [sortInfo, setSortInfo] = useState("");
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(1);

    // 페이지를 선택했을 때 실행되는 함수
    const handlePageChange = (event) => {
        setPage(event.currentTarget.getAttribute('value') - 1);
    }

    /* 대분류 카테고리 옵션 선택시 */
    const handleBigOptionChange = (e, data) => {
        const bigData = data.value;
        if (bigData === 'EA') {
            setSmallCategory(eaData);
        } else if (bigData === 'EU') {
            setSmallCategory(euData);
        } else if (bigData === 'AM') {
            setSmallCategory(amData);
        } else if (bigData === 'ETC') {
            setSmallCategory(etcData);
        }
    }

    /* 소분류 카테고리 옵션 선택시 */
    const handleSmallOptionChange = (e, data) => {
        setTravelArea(data.value);
    }

    /* 정렬 Info 변경시 */
    const handleSortInfoChange = (e, data) => {
        setSortInfo(data.value);
    }

    const trevelAreaFilter = (travelAreaArrStr) => {
        const travelAreaArr = travelAreaArrStr.split(",");

        // travelAreaArr를 map을 사용해 Label 요소로 변환
        const labels = travelAreaArr.map((travelArea, index) => (
            <Label key={index}>
                <Flag name={formatTravelArea.formatTravelAreaFlag(travelArea)} />
                {formatTravelArea.formatTravelArea(travelArea)}
            </Label>
        ));

        return labels;
    }

    useEffect(() => {
        axios.get(`/trip/boardList/${page}`, {
            params: {
                'travelArea': travelArea.join(','),
                'sortInfo': sortInfo
            }
        })
        .then(response => {
            if (response.status === 200) {
                setData(response.data.content);
                if (response.data.totalPages === 0) {
                    setPageSize(1);
                } else {
                    setPageSize(response.data.totalPages);
                }
            }
        })
        .catch(error => {
            alert(error);
        });

    }, [page, travelArea, sortInfo]);

    return (
        <div>
            <MainDiv>
                <HeaderImgDiv>
                    <OpacityDiv>
                        <Pmain>허니문 여행후기</Pmain>
                        <Psub>Wedding Bliss Tour와 함께한 허니문 후기를 작성하면 추첨을 통해 소정의 경품을 드립니다.</Psub>
                    </OpacityDiv>
                </HeaderImgDiv>
                <Grid columns='equal'>
                    <Grid.Column width={3}>
                        <Select
                            placeholder='대분류'
                            options={bigCategory}
                            onChange={handleBigOptionChange}
                        />
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Dropdown
                            placeholder='소분류'
                            fluid
                            multiple
                            search
                            selection
                            options={smallCategory}
                            onChange={handleSmallOptionChange}
                        />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Select
                            placeholder='정렬조건'
                            options={sortOption}
                            onChange={handleSortInfoChange}
                        />
                    </Grid.Column>
                </Grid>
                <Table color={'teal'} singleLine>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={1} textAlign='center'>리뷰번호</Table.HeaderCell>
                            <Table.HeaderCell width={3} textAlign='center'>여행지역</Table.HeaderCell>
                            <Table.HeaderCell width={9}>리뷰제목</Table.HeaderCell>
                            <Table.HeaderCell width={2}>작성자</Table.HeaderCell>
                            <Table.HeaderCell width={2}>여행평점</Table.HeaderCell>
                            <Table.HeaderCell width={2}>작성일</Table.HeaderCell>
                            <Table.HeaderCell width={2} textAlign='center'>조회수</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {data.length > 0 ? data.map((item, index) => (
                            <Table.Row key={index}>
                                <Table.Cell textAlign='center'>{item.rno}</Table.Cell>
                                <Table.Cell textAlign='center'>{trevelAreaFilter(item.travelArea)}</Table.Cell>
                                <Table.Cell>{item.title}</Table.Cell>
                                <Table.Cell>{item.writer}</Table.Cell>
                                <Table.Cell>
                                    <Rating icon='star' rating={Number(item.rating)} maxRating={5} disabled={true} />
                                </Table.Cell>
                                <Table.Cell>{formatDate.formatFullDateTime(item.regTime)}</Table.Cell>
                                <Table.Cell textAlign='center'>{item.viewCnt}</Table.Cell>
                            </Table.Row>
                        )) : (
                            <Table.Row>
                                <Table.Cell colSpan="6" rowSpan="6">
                                    <Plabel>허니문 여행 후기가 없습니다.</Plabel>
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan='7' style={{ textAlign: "center" }}>
                                <Pagination
                                    defaultActivePage={1}
                                    firstItem={null}
                                    lastItem={null}
                                    pointing
                                    secondary
                                    totalPages={pageSize}
                                    onPageChange={handlePageChange}
                                />
                            </Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell colSpan='7' style={{ textAlign: "right" }}>
                                <Link to="/review/reviewWrite">
                                    <Button primary type='button'>후기작성</Button>
                                </Link>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </MainDiv>
        </div>
    );
}

export default ReviewList;
