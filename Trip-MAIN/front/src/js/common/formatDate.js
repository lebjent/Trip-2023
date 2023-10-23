/* 
    작 성 자 : 전 준 표
    작 성 일 : 2023-10-19
    작 성 내 용 : DB에서 받아온 날짜데이터를 YYYY-MM-DD-MM-SEC으로 변환
*/

export function formatFullDateTime(dateString) {
    const date = new Date(dateString);
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    const formattedDateTime = year +"-"+ month +"-" +day +" "+hours + ":" + minutes + ":" +seconds;
  
    return formattedDateTime;
  }