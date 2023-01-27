type Dice = {
  id: string;
  name: string;
  src: string;
};

type Move = {
  count: number;
  field: string[][];
  // 퀀텀 좌표
  r: number; // 0-2
  c: number; // 0-4
  moves: string;
};
