const fs = require('fs');
const { getSeoulWeather } = require('./weather.js');
const { getRandomGreeting } = require('./comments.js');

// 메인 실행 함수
async function updateReadme() {
// 날씨 정보 가져오기
const weatherEmoji = await getSeoulWeather();

// 한국 시간 정확히 계산
const now = new Date();
const koreaTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Seoul"}));
const hour = koreaTime.getHours();

console.log(`현재 한국 시간: ${now.toLocaleString('ko-KR', {timeZone: 'Asia/Seoul'})}`);
console.log(`시간: ${hour}시`);

// 현재 시간대 결정
let timeOfDay;
if (hour >= 0 && hour < 6) {
  timeOfDay = 'dawn';
} else if (hour >= 6 && hour < 12) {
  timeOfDay = 'morning';
} else if (hour >= 12 && hour < 18) {
  timeOfDay = 'afternoon';
} else {
  timeOfDay = 'evening';
}

// 해당 시간대의 문구 중 랜덤 선택
const selectedGreeting = getRandomGreeting(timeOfDay, weatherEmoji);

// 한국시간 기준 현재 시각을 정각으로 표시
const timeString = new Date().toLocaleString('en-US', { 
  timeZone: 'Asia/Seoul',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true
}).replace(/:\d{2}/, ':00');

// README 템플릿 - 여러 폰트 방법 시도
const readmeTemplate = `<div align="center">

<br>

<h3>❝${selectedGreeting}❞</h3>

<sub>${timeString} • Seoul ${weatherEmoji} • by CrowRish</sub>

<br>

</div>`;

// README.md 파일 업데이트
fs.writeFileSync('README.md', readmeTemplate);
console.log(`✅ README.md 업데이트 완료! (${timeOfDay} - ${selectedGreeting})`);
}

// 함수 실행
updateReadme();
