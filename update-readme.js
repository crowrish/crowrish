const fs = require('fs');

// 한국 시간 기준으로 현재 시간 가져오기
const now = new Date();
const koreaTime = new Date(now.getTime() + (9 * 60 * 60 * 1000)); // UTC+9
const hour = koreaTime.getHours();

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
    "🕯️ 촛불 켜고 편안하게 보내는 저녁 시간이에요"
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

// 현재 시간을 PM HH:MM Seoul 형식으로 포맷
const timeString = koreaTime.toLocaleString('en-US', { 
  timeZone: 'Asia/Seoul',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true
}) + ' Seoul';

// README 템플릿 - h3 크기 + 서울 시간 표시
const readmeTemplate = `<div align="center">

<br>

### ${selectedGreeting}
<sub>${timeString} • by CrowRish</sub>

<br>


</div>`;

// README.md 파일 업데이트
fs.writeFileSync('README.md', readmeTemplate);
console.log(`✅ README.md 업데이트 완료! (${timeOfDay} - ${selectedGreeting})`);
