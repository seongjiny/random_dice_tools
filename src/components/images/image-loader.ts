const DICE_IMAGE_ARRAY: Dice[] = [
  {
    name: '충전',
    src: require('src/assets/dice-images/charge.webp'),
    id: 'charge',
  },
  {
    name: '빛의 검',
    src: require('src/assets/dice-images/holy_sword.webp'),
    id: 'hsword',
  },
  {
    name: '달',
    src: require('src/assets/dice-images/lunar.webp'),
    id: 'lunar',
  },
  {
    name: '지뢰',
    src: require('src/assets/dice-images/mine.webp'),
    id: 'mine',
  },
  {
    name: '조준경',
    src: require('src/assets/dice-images/scope.webp'),
    id: 'scope',
  },
  {
    name: '눈덩이',
    src: require('src/assets/dice-images/snowball.webp'),
    id: 'snowb',
  },
  {
    name: '태양',
    src: require('src/assets/dice-images/solar.webp'),
    id: 'solar',
  },
  {
    name: '코어',
    src: require('src/assets/dice-images/core.png'),
    id: 'core',
  }
];

const DICE_IMAGE_MAP = {
  qm: {
    name: '물음표',
    src: require('src/assets/dice-images/question.webp'),
  },
  core: {
    name: '코어',
    src: require('src/assets/dice-images/core.png'),
  },
  charge: {
    name: '충전',
    src: require('src/assets/dice-images/charge.webp'),
  },
  hsword: {
    name: '빛의 검',
    src: require('src/assets/dice-images/holy_sword.webp'),
  },
  lunar: {
    name: '달',
    src: require('src/assets/dice-images/lunar.webp'),
  },
  mine: {
    src: require('src/assets/dice-images/mine.webp'),
    id: 'mine',
  },
  scope: {
    src: require('src/assets/dice-images/scope.webp'),
    id: 'scope',
  },
  snowb: {
    src: require('src/assets/dice-images/snowball.webp'),
    id: 'snowb',
  },
  solar: {
    src: require('src/assets/dice-images/solar.webp'),
    id: 'solar',
  },
};

export { DICE_IMAGE_ARRAY, DICE_IMAGE_MAP };
