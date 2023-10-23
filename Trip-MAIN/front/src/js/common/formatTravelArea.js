
const travelAreaName = {
    KLO: '보라카이',
    CXR: '나트랑',
    DPS: '발리',
    HKT: '푸켓',
    DE: '독일',
    FR: '프랑스',
    CH: '스위스',
    SE: '스웨덴',
    AT: '오스트리아',
    CZ: '체코',
    FI: '핀란드',
    HU: '헝가리',
    GUM: '괌',
    LAX: '로스엔젤레스',
    SPN: '사이판',
    HNL: '하와이',
    DXB: '두바이',
    MRU: '모리셔스',
    MLE: '몰디브'
  };
  
  const travelAreaFlagName = {
    KLO: 'ph',
    CXR: 'vn',
    DPS: 'id',
    HKT: 'th',
    DE: 'de',
    FR: 'fr',
    CH: 'ch',
    SE: 'se',
    AT: 'at',
    CZ: 'cz',
    FI: 'fi',
    HU: 'hu',
    GUM: 'us',
    LAX: 'us',
    SPN: 'us',
    HNL: 'us',
    DXB: 'ae',
    MRU: 'mu',
    MLE: 'mv'
  };

  export function formatTravelArea(travelArea) {
    return travelAreaName[travelArea];
  }

  export function formatTravelAreaFlag(travelArea) {
    return travelAreaFlagName[travelArea];
  }