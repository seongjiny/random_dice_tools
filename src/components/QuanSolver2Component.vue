<script setup lang="ts">
import {
  DICE_IMAGE_ARRAY,
  DICE_IMAGE_MAP,
} from 'src/components/images/image-loader';
import { ref } from 'vue';
import useNotify from 'src/components/common/useNotify';
import { FROM_FIELD, TO_FIELD } from 'src/components/data/field';

const uNotify = useNotify();
const selected_dice = ref('qm');
const 충달검조눈 = ref(['charge', 'lunar', 'hsword', 'scope', 'snowb', 'core']);
const from_field = ref(FROM_FIELD);
const to_field = ref(TO_FIELD);
const answers = ref([] as string[]);
const failMsg = ref('');

const dice_images = ref(
  DICE_IMAGE_ARRAY.filter((x) => 충달검조눈.value.includes(x.id as string))
);

const getImageSrc = (i: number, j: number, field: string[][]) => {
  i -= 1;
  j -= 1;
  return DICE_IMAGE_MAP[field[i][j]].src;
};

const replaceDice = (i: number, j: number, field: string[][]) => {
  field[i][j] = selected_dice.value;
};

const checkField = (field1: string[][], field2: string[][]) => {
  const temp_counter = {
    core: 0,
    charge: 0,
    solar: 0,
    lunar: 0,
    snowb: 0,
    mine: 0,
    hsword: 0,
    scope: 0,
  };

  // 빈공간 확인
  field1.forEach((r) => {
    if (r.includes('qm')) {
      uNotify.negativeMessage('빈공간을 채워주세요.');
      return false;
    }
  });
  field2.forEach((r) => {
    if (r.includes('qm')) {
      uNotify.negativeMessage('빈공간을 채워주세요.');
      return false;
    }
  });

  let core_count = 0;
  field1.forEach((r) => {
    r.forEach((c) => {
      if (c === 'core') {
        core_count++;
      }
    });
  });
  console.log('core1', core_count);
  if (core_count != 1) {
    uNotify.negativeMessage('코어는 필드당 하나만 해주세요.');
    return false;
  }
  core_count = 0;
  field2.forEach((r) => {
    r.forEach((c) => {
      if (c === 'core') {
        core_count++;
      }
    });
  });
  console.log('core2', core_count);
  if (core_count != 1) {
    uNotify.negativeMessage('코어는 필드당 하나만 해주세요.');
    return false;
  }
  // 코어 갯수 확인

  // 주사위 갯수 확인
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 5; c++) {
      temp_counter[field1[r][c]]++;
      temp_counter[field2[r][c]]--;
    }
  }

  let match = true;
  Object.keys(temp_counter).forEach((key) => {
    if (temp_counter[key] != 0) {
      match = false;
    }
  });

  if (!match) {
    uNotify.negativeMessage('주사위 숫자가 맞지 않습니다.');
    return false;
  }

  return true;
};

const calculate = () => {
  console.log('필드 확인중');
  if (!checkField(from_field.value, to_field.value)) {
    return;
  }
  console.log('계산 시작');
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
          :src="getImageSrc(i, j, from_field)"
          :key="j"
          @click="replaceDice(i - 1, j - 1, from_field)"
        />
      </div>
    </div>
    <div class="column q-ma-md field-bg">
      <div class="row" v-for="i in 3" :key="i">
        <img
          v-for="j in 5"
          :src="getImageSrc(i, j, to_field)"
          :key="j"
          @click="replaceDice(i - 1, j - 1, to_field)"
        />
      </div>
    </div>
    <div class="q-pa-sm row justify-evenly">
      <div class="q-ma-md">
        <q-btn @click="calculate()">계산</q-btn>
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
