<script setup lang="ts">
import {
  DICE_IMAGE_ARRAY,
  DICE_IMAGE_MAP,
} from 'src/components/images/image-loader';
import { ref } from 'vue';
import useNotify from 'src/components/common/useNotify';
import { EMPTY_FIELD, 충달검조눈정답 } from 'src/components/data/field';

const uNotify = useNotify();
const current_deck = ref('충달검조눈');
// const current_deck = ref('덱 선택');
const deck_option = ref('딜 주사위 1개');
const selected_dice = ref('qm');
const preset_deck = ref(['충달검조눈']);
// const preset_deck = ref(['충달검조눈', '태달검조눈', '충달검조지']);
const 충달검조눈 = ref(['charge', 'lunar', 'hsword', 'scope', 'snowb', 'core']);
const dice_id_array = ref(EMPTY_FIELD);
const goal = ref(충달검조눈정답);
const answers = ref([] as string[]);
const failMsg = ref('');

const dice_images = ref(
  DICE_IMAGE_ARRAY.filter((x) => 충달검조눈.value.includes(x.id as string))
);

const getImageSrc = (i: number, j: number) => {
  i -= 1;
  j -= 1;
  return DICE_IMAGE_MAP[dice_id_array.value[i][j]].src;
};

const changeDeck = (deck: string) => {
  current_deck.value = deck;
};

const replaceDice = (i: number, j: number) => {
  dice_id_array.value[i][j] = selected_dice.value;
};

const checkField = () => {
  let countCore = 0;
  let countDmg = 0; // 충전, 태양
  let countLunar = 0;
  let countScope = 0;
  let countHsword = 0;
  let countSupp = 0; // 눈덩이, 지뢰
  let fail = false;
  dice_id_array.value.forEach((x) => {
    x.forEach((y) => {
      if (y === 'core') countCore++;
      else if (y === 'charge' || y === 'solar') countDmg++;
      else if (y === 'lunar') countLunar++;
      else if (y === 'scope') countScope++;
      else if (y === 'hsword') countHsword++;
      else if (y === 'snowb' || y === 'mine') countSupp++;
      else fail = true;
    });
  });
  console.log('countCore', countCore);
  console.log('countDmg', countDmg);
  console.log('countLunar', countLunar);
  console.log('countScope', countScope);
  console.log('countHsword', countHsword);
  console.log('countSupp', countSupp);
  let msg = '';
  if (fail) {
    msg = '주사위 숫자가 맞지 않습니다.\n모든 필드를 채워주세요.';
  } else if (countCore != 1) {
    msg = `코어의 숫자는 한개만 가능합니다.\n발견된 코어 ${countCore}개`;
  } else if (countDmg != 1) {
    msg = `충달검조눈 충전은 1개입니다.\n발견된 충전 ${countDmg}개`;
  } else if (countLunar != 3) {
    msg = `충달검조눈 달은 3개입니다.\n발견된 달 ${countLunar}개`;
  } else if (countScope != 3) {
    msg = `충달검조눈 조준경은 3개입니다.\n발견된 조준경 ${countScope}개`;
  } else if (countHsword != 6) {
    msg = `충달검조눈 빛검은 6개입니다.\n발견된 빛검 ${countHsword}개`;
  } else if (countSupp != 1) {
    msg = `충달검조눈 눈덩이은 1개입니다.\n발견된 눈덩이 ${countSupp}개`;
  }
  if (msg !== '') {
    uNotify.negativeMessage(msg);
    return false;
  }
  return true;
};

const calculateMin = async () => {
  if (!checkField()) {
    return;
  }
  console.log('계산 시작');
  failMsg.value = '계산 중 입니다';
  let queue: Move[] = [];
  const stringSet: Set<string> = new Set();
  stringSet.add(dice_id_array.value.toString());
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 5; c++) {
      if (dice_id_array.value[r][c] === 'core') {
        const firstMove: Move = {
          count: 0,
          field: dice_id_array.value.map((x) => [...x]),
          r: r,
          c: c,
          moves: '',
        };
        queue.push(firstMove);
        r = 3;
        c = 5;
        break;
      }
    }
  }
  // 처음에 4방향 넣어주고 시작

  answers.value = [];
  let limit = 0;
  while (limit++ < 30 && answers.value.length == 0) {
    const newQueue: Move[] = [];
    queue.forEach((item) => {
      const r = item.r;
      const c = item.c;
      const field = item.field;
      const count = item.count + 1;
      const moves = item.moves;
      //up
      if (r - 1 >= 0) {
        const cloneUp = field.map((x) => [...x]);
        let temp = field[r - 1][c];
        cloneUp[r - 1][c] = 'core';
        cloneUp[r][c] = temp;
        if (goal.value.includes(cloneUp.toString())) {
          console.log(moves + '↑');
          console.log(count);
          answers.value.push(moves + '↑');
          return;
        }
        if (!stringSet.has(cloneUp.toString())) {
          stringSet.add(cloneUp.toString());
          newQueue.push({
            count: count,
            field: cloneUp,
            r: r - 1,
            c: c,
            moves: moves + '↑',
          });
        }
      }
      //down
      if (r + 1 < 3) {
        const cloneDown = field.map((x) => [...x]);
        let temp = field[r + 1][c];
        cloneDown[r + 1][c] = 'core';
        cloneDown[r][c] = temp;
        // if (cloneDown.toString() === goal.value.toString()) {
        if (goal.value.includes(cloneDown.toString())) {
          console.log(moves + '↓');
          console.log(count);
          answers.value.push(moves + '↓');
          return;
        }
        if (!stringSet.has(cloneDown.toString())) {
          stringSet.add(cloneDown.toString());
          newQueue.push({
            count: count,
            field: cloneDown,
            r: r + 1,
            c: c,
            moves: moves + '↓',
          });
        }
      }
      //left
      if (c - 1 >= 0) {
        const cloneLeft = field.map((x) => [...x]);
        let temp = field[r][c - 1];
        cloneLeft[r][c - 1] = 'core';
        cloneLeft[r][c] = temp;
        if (goal.value.includes(cloneLeft.toString())) {
          console.log(moves + '←');
          console.log(count);
          answers.value.push(moves + '←');
          return;
        }
        if (!stringSet.has(cloneLeft.toString())) {
          stringSet.add(cloneLeft.toString());
          newQueue.push({
            count: count,
            field: cloneLeft,
            r: r,
            c: c - 1,
            moves: moves + '←',
          });
        }
      }
      //right
      if (c + 1 < 5) {
        const cloneRight = field.map((x) => [...x]);
        let temp = field[r][c + 1];
        cloneRight[r][c + 1] = 'core';
        cloneRight[r][c] = temp;
        if (goal.value.includes(cloneRight.toString())) {
          console.log(moves + '→');
          console.log(count);
          answers.value.push(moves + '→');
          return;
        }
        if (!stringSet.has(cloneRight.toString())) {
          stringSet.add(cloneRight.toString());
          newQueue.push({
            count: count,
            field: cloneRight,
            r: r,
            c: c + 1,
            moves: moves + '→',
          });
        }
      }
    });

    // reassign queue
    queue = [...newQueue];
  }
  if (answers.value.length > 0) {
    uNotify.positiveMessage('정답을 찾았습니다');
    failMsg.value = '';
  } else {
    uNotify.negativeMessage(
      '30번 움직여도 안되네요.\n배치를 바꾸고 다시 시도해주세요.\n(충전과 눈덩이의 위치를 먼저 잡고 하시면 경우의 수가 줄어듭니다)'
    );
    failMsg.value =
      '30번 움직여도 안되네요.\n배치를 바꾸고 다시 시도해주세요.\n(충전과 눈덩이의 위치를 먼저 잡고 하시면 경우의 수가 줄어듭니다)';
  }
};
</script>
<template>
  <q-page class="column q-ma-lg" style="width: 300px">
    <div>
      <img
        v-for="dice in dice_images"
        :src="dice.src"
        :key="dice.name"
        @click="selected_dice = dice.id"
      />
    </div>
    <div class="column q-ma-md field-bg">
      <div class="row" v-for="i in 3" :key="i">
        <img
          v-for="j in 5"
          :src="getImageSrc(i, j)"
          :key="j"
          @click="replaceDice(i - 1, j - 1)"
        />
      </div>
    </div>

    <div class="q-pa-sm row justify-evenly">
      <q-btn-dropdown color="green-5" :label="current_deck">
        <q-list>
          <q-item
            v-for="deck in preset_deck"
            clickable
            v-close-popup
            @click="changeDeck(deck)"
            :key="deck"
          >
            <q-item-section>
              <q-item-label>{{ deck }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <q-btn-dropdown color="blue-5" :label="deck_option">
        <q-list>
          <q-item
            v-for="option in ['딜 주사위 1개']"
            clickable
            v-close-popup
            @click="deck_option = option"
            :key="option"
          >
            <q-item-section>
              <q-item-label>{{ option }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <div class="q-ma-md">
        <q-btn @click="calculateMin()">최소값 계산</q-btn>
      </div>
    </div>
    <div class="column text-body1">
      <div v-for="answer in answers" :key="answer">
        <hr />
        <p>{{ answer }}</p>
      </div>
    </div>
    <div>
      {{ failMsg }}
    </div>
  </q-page>
</template>
<style>
img {
  width: 50px;
  height: 50px;
}

div.field-bg {
  background-image: url('./../assets/battlefields/quantum.png');
  background-size: cover;
  width: 250px;
  height: 150px;
}
</style>
