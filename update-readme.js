const fs = require('fs');
const { getSeoulWeather } = require('./weather.js');

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

// 시간대별 문구 배열 - Chill한 일상 멘트들
const greetings = {
  dawn: [ // 0-5시 (새벽)
    "🌙 세상이 조용한 밤, 생각하기 좋은 시간이네요",
    "✨ 밤늦은 산책을 하고 싶은 기분입니다",
    "🌌 별 보기 좋은 새벽이에요",
    "💤 모두가 꿈꾸는 시간, 혼자만의 여유를 즐기고 있어요"
  ],
  morning: [ // 6-11시 (오전)
    "☀️ 커피 한 잔과 함께 시작하는 상쾌한 아침입니다",
    "🌅 창문을 열고 싶어지는 좋은 날씨네요",
    "☕ 모닝 루틴을 천천히 즐기고 있어요",
    "🌱 새로운 하루, 뭔가 좋은 일이 생길 것 같은 기분이에요"
  ],
  afternoon: [ // 12-17시 (오후)
    "☕ 커피 한잔하기 좋은 오후입니다",
    "🌞 점심 후 여유롭게 보내는 오후 시간이에요",
    "🎵 좋아하는 음악 들으며 쉬고 있어요",
    "🌿 산책하고 싶어지는 따뜻한 오후네요"
  ],
  evening: [ // 18-23시 (저녁)
    "🌆 하루 마무리하며 차 한 잔 마시고 있어요",
    "🌙 오늘 하루도 수고 많았네요, 이제 쉬어도 될 시간",
    "📚 책 읽기 좋은 조용한 저녁입니다",
    "🕯️ 편안하게 보내는 저녁 시간이에요"
  ]
};

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
const selectedGreeting = greetings[timeOfDay][Math.floor(Math.random() * greetings[timeOfDay].length)];

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
