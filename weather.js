// 서울 날씨 정보 가져오기 (Open-Meteo API)
async function getSeoulWeather() {
  try {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=37.5665&longitude=126.9780&current_weather=true');
    const data = await response.json();
    
    const weatherCode = data.current_weather.weathercode;
    const isDay = data.current_weather.is_day;
    
    // 날씨 코드에 따른 이모지 매핑
    const weatherEmojis = {
      0: isDay ? '☀️' : '🌙',     // Clear sky
      1: isDay ? '🌤️' : '🌙',     // Mainly clear
      2: isDay ? '⛅' : '☁️',     // Partly cloudy
      3: '☁️',                    // Overcast
      45: '🌫️',                  // Fog
      48: '🌫️',                  // Depositing rime fog
      51: '🌦️',                  // Light drizzle
      53: '🌦️',                  // Moderate drizzle
      55: '🌧️',                  // Dense drizzle
      56: '🌧️',                  // Light freezing drizzle
      57: '🌧️',                  // Dense freezing drizzle
      61: '🌦️',                  // Slight rain
      63: '🌧️',                  // Moderate rain
      65: '🌧️',                  // Heavy rain
      66: '🌨️',                  // Light freezing rain
      67: '🌨️',                  // Heavy freezing rain
      71: '❄️',                   // Slight snow fall
      73: '❄️',                   // Moderate snow fall
      75: '🌨️',                  // Heavy snow fall
      77: '❄️',                   // Snow grains
      80: '🌦️',                  // Slight rain showers
      81: '🌧️',                  // Moderate rain showers
      82: '🌧️',                  // Violent rain showers
      85: '🌨️',                  // Slight snow showers
      86: '🌨️',                  // Heavy snow showers
      95: '⛈️',                   // Thunderstorm
      96: '⛈️',                   // Thunderstorm with slight hail
      99: '⛈️'                    // Thunderstorm with heavy hail
    };
    
    const weatherEmoji = weatherEmojis[weatherCode] || '🌤️';
    console.log(`날씨 코드: ${weatherCode}, 이모지: ${weatherEmoji}, 낮/밤: ${isDay ? '낮' : '밤'}`);
    
    return weatherEmoji;
  } catch (error) {
    console.log('날씨 정보를 가져올 수 없습니다:', error.message);
    return '🌤️'; // 기본 이모지
  }
}

module.exports = { getSeoulWeather };
