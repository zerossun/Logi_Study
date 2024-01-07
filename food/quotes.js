const quotes = [
  {
    quote: '​맛있으면 0칼로리',
    author: '최화정',
  },
  {
    quote: '누구나 요리를 할 수 있다',
    author: '영화 라따뚜이 레미',
  },
  {
    quote: '음식은 사진이 아닌 배에 담는 것',
    author: '씨스타 효린',
  },
  {
    quote: '맛없는데 비싸면 맞아야 돼',
    author: '상류사회 박형식',
  },
  {
    quote: '아는 맛이 가장 맛있는 맛',
    author: '3대천왕 김준현',
  },
  {
    quote:'부먹 찍먹 논할 시간에 한 입 더 먹어라',
    author: 'BTS 지민',
  },
  {
    quote: '음식은 두가지로 나뉜다. 내가 먹어본 것, 내가 앞으로 먹어볼 것',
    author: '쩝쩝박사1',
  },
  {
    quote: '먹어봤자 내가 아는 그 맛이 좋아서 먹는거다',
    author: '쩝쩝박사2',
  },
  {
    quote: '저기압일 땐 고기앞으로 가라',
    author: '고깃집 사장님',
  },
  {
    quote:'라면에 물이 많으면 라면을 더 넣으면 된다.',
    author: '쩝쩝박사3',
  },
];

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');

const todayQuotes = quotes[Math.floor(Math.random() * quotes.length)];
console.log(todayQuotes);
quote.innerText = todayQuotes.quote;
author.innerText = todayQuotes.author;
